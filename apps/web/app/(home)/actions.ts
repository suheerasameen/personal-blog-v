'use server';

import { getContact, sendWelcomeEmail, updateContact } from '@/lib/resend';
import { ActionError, actionClient } from '@/lib/safe-action';
import { NewsletterSchema } from '@/lib/validators';
import { Resend } from 'resend';
import { getBlogPosts } from '@/lib/source';

const resend = new Resend(process.env.RESEND_API_KEY as string);
const audienceId = process.env.RESEND_AUDIENCE_ID as string;

const topicIds: Record<string, string> = {
  all: process.env.RESEND_TOPIC_ALL_UPDATES as string,
  tech: process.env.RESEND_TOPIC_TECH as string,
  cybersecurity: process.env.RESEND_TOPIC_CYBERSECURITY as string,
};

export const subscribeUser = actionClient
  .schema(NewsletterSchema)
  .action(async ({ parsedInput: { email, topics } }) => {
    try {
      const contact = await getContact({ email, audienceId });

      if (contact) {
        await updateContact({
          email,
          firstName: '',
          lastName: '',
          audienceId,
          unsubscribed: false,
        });

        return {
          success: true,
          message: 'You are already subscribed to our newsletter!',
        };
      }

      const { data, error } = await resend.contacts.create({
        email,
        audienceId,
        firstName: '',
        lastName: '',
        unsubscribed: false,
      });

      if (!data || error) {
        throw new Error(
          `Failed to create contact: ${error?.message || 'Unknown error'}`,
        );
      }

      // Subscribe to selected topics
      const selectedTopicIds = topics.map(topic => topicIds[topic]).filter(Boolean);
      
      for (const topicId of selectedTopicIds) {
        try {
          await resend.contacts.update({
            email,
            audienceId,
            topicId,
            subscribed: true,
          });
        } catch (topicError) {
          console.error(`Failed to subscribe to topic ${topicId}:`, topicError);
        }
      }

      // Get recent 3 blog posts
      const allPosts = getBlogPosts();
      const sortedPosts = allPosts
        .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime())
        .slice(0, 3);
      
      const recentPosts = sortedPosts.map(post => ({
        title: post.data.title,
        description: post.data.description,
        date: post.data.date,
        url: post.url,
      }));

      await sendWelcomeEmail({
        to: email,
        firstName: 'there',
        posts: recentPosts,
      });

      return {
        success: true,
        message: 'You are now subscribed to our newsletter!',
      };
    } catch (error) {
      console.error('Failed to subscribe:', error);
      if (error instanceof ActionError) throw error;
      throw new ActionError('Oops, something went wrong while subscribing.');
    }
  });
