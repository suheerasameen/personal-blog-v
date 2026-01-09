'use client';

import { useAction } from 'next-safe-action/hooks';
import { Button } from '@repo/shadverse/components/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/shadverse/components/form';
import { Input } from '@repo/shadverse/components/input';
import { Checkbox } from '@repo/shadverse/components/checkbox';
import type { Newsletter } from '@/lib/validators';
import { NewsletterSchema } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert, AlertTitle } from '@repo/shadverse/components/alert';
import { subscribeUser } from '@/app/(home)/actions';
import { Icons } from '@/components/icons';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const NewsletterForm = () => {
  const form = useForm({
    resolver: zodResolver(NewsletterSchema),
    defaultValues: {
      email: '',
      topics: ['all'],
    },
  });

  const { execute, result, status } = useAction(subscribeUser);

  const onSubmit = (values: Newsletter) => {
    execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-4'>
        <FormField
          control={form.control}
          name='topics'
          render={() => (
            <FormItem>
              <div className='flex flex-wrap gap-4'>
                <FormField
                  control={form.control}
                  name='topics'
                  render={({ field }) => {
                    return (
                      <FormItem className='flex items-center space-x-2 space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes('all')}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(['all', 'tech', 'cybersecurity'])
                                : field.onChange([]);
                            }}
                          />
                        </FormControl>
                        <FormLabel className='text-sm font-normal cursor-pointer'>
                          All Updates
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name='topics'
                  render={({ field }) => {
                    return (
                      <FormItem className='flex items-center space-x-2 space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes('tech')}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value.filter(v => v !== 'all'), 'tech'])
                                : field.onChange(field.value?.filter((value) => value !== 'tech'));
                            }}
                          />
                        </FormControl>
                        <FormLabel className='text-sm font-normal cursor-pointer'>
                          Tech
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name='topics'
                  render={({ field }) => {
                    return (
                      <FormItem className='flex items-center space-x-2 space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes('cybersecurity')}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value.filter(v => v !== 'all'), 'cybersecurity'])
                                : field.onChange(field.value?.filter((value) => value !== 'cybersecurity'));
                            }}
                          />
                        </FormControl>
                        <FormLabel className='text-sm font-normal cursor-pointer'>
                          Cybersecurity
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex h-full min-h-10 overflow-hidden rounded-md border bg-muted p-0'>
          <div className='flex-1'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='group h-full'>
                  <FormControl className='h-full group-has-[p]:pt-3'>
                    <Input
                      {...field}
                      disabled={status === 'executing'}
                      placeholder='Email address'
                      type='email'
                      className='h-full rounded-md rounded-r-none border-none px-4 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                  </FormControl>
                  <FormMessage className='ml-4 pb-2 text-xs' />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={status === 'executing'}
            type='submit'
            size='icon'
            className='group size-auto w-15 rounded-md rounded-l-none px-3'
          >
            {status === 'executing' ? (
              <Loader2 className='size-4 animate-spin' />
            ) : (
              <Send className='group-hover:-rotate-45 size-4 transition-transform' />
            )}
          </Button>
        </div>

        {status === 'hasSucceeded' && (
          <Alert className='border-emerald-500/15 bg-emerald-500/15 p-3 px-3 py-2 text-emerald-500 has-[>svg]:gap-x-1.5'>
            <CheckCircle2 size={16} />
            <AlertTitle className='mb-0 leading-normal'>
              {result.data?.message ?? "Hmm... Our server didn't respond."}
            </AlertTitle>
          </Alert>
        )}
        {result.serverError && (
          <Alert className='border-destructive/15 bg-destructive/15 p-3 px-3 py-2 text-destructive has-[>svg]:gap-x-1.5 dark:border-destructive dark:bg-destructive dark:text-destructive-foreground'>
            <AlertCircle className='size-4' />
            <AlertTitle className='mb-0 leading-normal'>
              {result.serverError}
            </AlertTitle>
          </Alert>
        )}
      </form>
    </Form>
  );
};
