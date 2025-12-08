import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormValues } from '@/utils/validators';
import Button from '@/components/common/Button';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    const promise = api.submitContactForm(data);
    
    toast.promise(promise, {
      loading: 'Sending your message...',
      success: (res) => {
        if(res.success) {
            reset();
            return 'Your message has been sent! We will reply within 24 hours.';
        } else {
            throw new Error('Failed to send message. Please try again.');
        }
      },
      error: 'Failed to send message. Please try again later.',
      finally: () => setIsSubmitting(false),
    });
  };

  const inputClass = "w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-ring focus:outline-none transition";
  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-foreground/80 mb-1">Full Name</label>
        <input id="fullName" {...register('fullName')} className={cn(inputClass, errors.fullName && 'border-red-500')} />
        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">Email</label>
        <input id="email" type="email" {...register('email')} className={cn(inputClass, errors.email && 'border-red-500')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-1">Subject</label>
        <select id="subject" {...register('subject')} className={cn(inputClass, errors.subject && 'border-red-500')}>
          <option value="">Select a subject...</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Custom Quote">Custom Quote</option>
          <option value="Support">Support Request</option>
        </select>
        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">Message</label>
        <textarea id="message" {...register('message')} rows={5} className={cn(inputClass, errors.message && 'border-red-500')} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full flex justify-center">
        {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;