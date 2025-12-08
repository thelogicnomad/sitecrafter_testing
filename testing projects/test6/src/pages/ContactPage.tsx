import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { Button } from '@/components/ui/Button';
    import { Mail, Phone, MapPin } from 'lucide-react';
    import { toast } from 'sonner';

    const contactSchema = z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      subject: z.string().min(5, 'Subject must be at least 5 characters'),
      message: z.string().min(20, 'Message must be at least 20 characters'),
    });
    
    type ContactFormValues = z.infer<typeof contactSchema>;
    
    const ContactPage = () => {
        const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
            resolver: zodResolver(contactSchema),
        });

        const onSubmit = async (data: ContactFormValues) => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(data);
            toast.success('Your message has been sent!');
            reset();
        };

      return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <header className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-foreground">Connect with the TablaMaster Team</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">Whether you have a technical question or a partnership inquiry, we look forward to hearing from you.</p>
            </header>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="bg-card p-8 rounded-lg shadow border">
                    <h2 className="text-2xl font-bold font-heading text-foreground">Send Us a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                            <input id="name" {...register('name')} className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
                        </div>
                         <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                            <input id="email" {...register('email')} className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
                        </div>
                         <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-foreground">Subject</label>
                            <input id="subject" {...register('subject')} className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>}
                        </div>
                         <div>
                            <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                            <textarea id="message" rows={5} {...register('message')} className="mt-1 block w-full px-3 py-2 bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
                        </div>
                        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>Send Message</Button>
                    </form>
                </div>
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <Mail className="h-8 w-8 text-primary"/>
                        <div>
                            <h3 className="text-lg font-semibold">Email</h3>
                            <p className="text-muted-foreground">support@tablamaster.com</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Phone className="h-8 w-8 text-primary"/>
                        <div>
                            <h3 className="text-lg font-semibold">Phone</h3>
                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <MapPin className="h-8 w-8 text-primary"/>
                        <div>
                            <h3 className="text-lg font-semibold">Address</h3>
                            <p className="text-muted-foreground">123 Rhythm Lane, Culture City, IN 46204</p>
                        </div>
                    </div>
                    <div className="w-full h-64 bg-muted rounded-lg mt-8">
                      <p className="text-center p-4 text-muted-foreground">Map placeholder</p>
                    </div>
                </div>
            </div>
        </div>
      );
    };
    
    export default ContactPage;