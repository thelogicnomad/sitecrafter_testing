import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useState } from 'react';

import SeoMeta from '@/components/shared/SeoMeta';
import { Button } from '@/components/ui/button';
import ClickSpark from '@/components/special/ClickSpark';
import { submitInquiry } from '@/lib/mockApi';
import { LoaderCircle, Mail, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  occasion: z.string().min(1, 'Please select an occasion'),
  requiredDate: z.string().min(1, 'Please select a date'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await submitInquiry(data);
      if (response.success) {
        toast.success(`Thank you! Your inquiry (ID: ${response.orderId}) has been received.`);
        reset();
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputClass = (hasError: boolean) => cn(
    "w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring",
    hasError ? 'border-destructive' : 'border-input'
  );

  return (
    <SeoMeta
      title="Custom Cake Order Form & Contact | Artisan Bakehouse"
      description="Inquire about custom wedding cakes, birthday orders, or corporate catering. Fast, detailed response guaranteed."
    >
      <div className="container-max section-spacing">
        <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold">Get In Touch</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">For bespoke cakes, large catering orders, or any other inquiries, please use the form below. We aim to respond within 48 hours.</p>
        </div>
        <div className="grid md:grid-cols-5 gap-12 mt-16">
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                <input id="fullName" {...register('fullName')} className={inputClass(!!errors.fullName)} />
                {errors.fullName && <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input id="email" type="email" {...register('email')} className={inputClass(!!errors.email)} />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="occasion" className="block text-sm font-medium mb-1">Occasion</label>
                  <select id="occasion" {...register('occasion')} className={inputClass(!!errors.occasion)}>
                    <option value="">Select an occasion...</option>
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Corporate</option>
                    <option>Other</option>
                  </select>
                  {errors.occasion && <p className="text-destructive text-sm mt-1">{errors.occasion.message}</p>}
                </div>
                <div>
                  <label htmlFor="requiredDate" className="block text-sm font-medium mb-1">Date Required</label>
                  <input id="requiredDate" type="date" {...register('requiredDate')} className={inputClass(!!errors.requiredDate)} />
                  {errors.requiredDate && <p className="text-destructive text-sm mt-1">{errors.requiredDate.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Detailed Description</label>
                <textarea id="description" {...register('description')} rows={5} className={inputClass(!!errors.description)}></textarea>
                {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
              </div>
              <ClickSpark>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                  Submit Inquiry
                </Button>
              </ClickSpark>
            </form>
          </div>
          <div className="md:col-span-2">
            <div className="bg-secondary p-8 rounded-lg">
                <h3 className="text-2xl font-bold font-heading">Contact Information</h3>
                <ul className="space-y-4 mt-6">
                    <li className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-1"/>
                        <div>
                            <h4 className="font-semibold">Address</h4>
                            <p className="text-muted-foreground">123 Sweet Street, Flavor Town, 90210</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-1"/>
                        <div>
                            <h4 className="font-semibold">Phone</h4>
                            <p className="text-muted-foreground">(555) 123-4567</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-1"/>
                        <div>
                            <h4 className="font-semibold">Email</h4>
                            <p className="text-muted-foreground">orders@artisanbakehouse.com</p>
                        </div>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </SeoMeta>
  );
};

export default ContactPage;