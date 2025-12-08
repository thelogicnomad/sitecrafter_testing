import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;