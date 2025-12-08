import React from 'react';
    import { useForm, SubmitHandler } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { cn } from '@/lib/utils';
    import { Input } from '@/components/ui/Input';
    import { Button } from '@/components/ui/Button';
    import { Card } from '@/components/ui/Card';
    import { motion } from 'framer-motion';
    import { toast } from 'sonner';

    interface ContactFormProps {
      onSubmit: (data: ContactFormData) => Promise<void>;
      className?: string;
    }

    // Zod schema for form validation
    const contactSchema = z.object({
      name: z.string().min(2, 'Name must be at least 2 characters.').max(50, 'Name cannot exceed 50 characters.'),
      email: z.string().email('Invalid email address.'),
      subject: z.string().min(5, 'Subject must be at least 5 characters.').max(100, 'Subject cannot exceed 100 characters.'),
      message: z.string().min(10, 'Message must be at least 10 characters.').max(1000, 'Message cannot exceed 1000 characters.'),
    });

    type ContactFormData = z.infer<typeof contactSchema>;

    const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, className }) => {
      const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
      });

      const onFormSubmit: SubmitHandler<ContactFormData> = async (data) => {
        try {
          // Simulate network latency
          await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
          await onSubmit(data);
          toast.success('Message Sent!', {
            description: 'Thank you for reaching out. We will get back to you shortly.',
          });
          reset();
        } catch (error) {
          console.error('Contact form submission error:', error);
          toast.error('Failed to send message.', {
            description: 'Please try again later or contact us directly.',
          });
        }
      };

      return (
        <Card className={cn('p-8 max-w-xl mx-auto bg-white/95 backdrop-blur-sm', className)}>
          <motion.h2
            className="text-3xl font-bold text-primary mb-6 text-center font-poppins"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Send Us a Message
          </motion.h2>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Input
                id="name"
                label="Your Name"
                type="text"
                placeholder="John Doe"
                {...register('name')}
                error={errors.name?.message}
                aria-required="true"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Input
                id="email"
                label="Your Email"
                type="email"
                placeholder="john.doe@example.com"
                {...register('email')}
                error={errors.email?.message}
                aria-required="true"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Input
                id="subject"
                label="Subject"
                type="text"
                placeholder="Inquiry about custom cakes"
                {...register('subject')}
                error={errors.subject?.message}
                aria-required="true"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className={cn(
                  'block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none transition-all duration-200',
                  'bg-white text-gray-900 placeholder-gray-400',
                  'border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/50',
                  errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
                  'shadow-inner-gilded'
                )}
                placeholder="Type your message here..."
                {...register('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-required="true"
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </motion.div>
          </form>
        </Card>
      );
    };

    export { ContactForm };