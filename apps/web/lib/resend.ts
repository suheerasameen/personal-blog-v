import { Resend, type UpdateContactOptions } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function updateContact({
  email,
  audienceId,
  ...props
}: {
  email: string;
  audienceId: string;
} & Omit<UpdateContactOptions, 'email' | 'audienceId'>) {
  const { data, error } = await resend.contacts.update({
    email,
    audienceId,
    ...props,
  });

  if (!data || error) {
    if (error?.name === 'not_found') {
      return null;
    }
    throw new Error(`Failed to update contact: ${error?.message}`);
  }

  return data;
}

export async function getContact({
  email,
  audienceId,
}: {
  email: string;
  audienceId: string;
}) {
  const { data: contacts, error } = await resend.contacts.list({ audienceId });

  if (error || !contacts) {
    throw new Error(
      `Failed to list contacts: ${error?.message || 'Unknown error'}`,
    );
  }

  const contact = contacts.data.find((contact) => contact.email === email);
  return contact || null;
}

interface BlogPost {
  title: string;
  description?: string;
  date: Date;
  url: string;
}

export async function sendWelcomeEmail({
  firstName,
  to,
  posts = [],
}: {
  firstName: string;
  to: string;
  posts?: BlogPost[];
}) {
  const EMAIL_FROM = process.env.EMAIL_FROM as string;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  if (!EMAIL_FROM) throw new Error('Missing EMAIL_FROM environment variable');
  if (!firstName || !to) throw new Error('Missing required email fields');

  const postsHtml = posts.length > 0
    ? posts.map(post => `
        <div style="margin: 24px 0; padding: 20px; background: #f9fafb; border-radius: 8px;">
          <h3 style="margin: 0 0 8px 0; font-size: 24px;">
            <a href="${baseUrl}${post.url}" style="color: #111827; text-decoration: none;">${post.title}</a>
          </h3>
          <p style="color: #6b7280; margin: 8px 0;">${post.description || 'Click to read more about this topic.'}</p>
          <a href="${baseUrl}${post.url}" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Read more →</a>
        </div>
      `).join('')
    : '<p style="color: #6b7280;">Stay tuned for upcoming content!</p>';

  const { data: res, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject: 'Welcome to my newsletter!',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 32px; font-weight: bold; margin: 0;">Welcome!</h1>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hey ${firstName},</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Thanks for subscribing to my newsletter! I'm excited to share my thoughts and ideas with you. 
          You can expect an email every few weeks, and I might occasionally share newsletter-only content as well—so stay tuned!
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Here are a few recent posts that you might find interesting:
        </p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        
        ${postsHtml}
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        
        <p style="font-size: 16px; line-height: 1.6; color: #374151;">
          Thank you for being a part of my community! I appreciate your support and look forward to connecting with you.
        </p>
        
        <p style="font-size: 24px; font-family: cursive; color: #111827; margin-top: 24px;">
          Waqas Ishaque
        </p>
        
        <p style="font-size: 12px; color: #9ca3af; margin-top: 32px; text-align: center;">
          You're receiving this because you subscribed to my newsletter. 
          <a href="${baseUrl}" style="color: #3b82f6; text-decoration: none;">Visit my blog</a>
        </p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Failed to send welcome email: ${JSON.stringify(error)}`);
  }
}
