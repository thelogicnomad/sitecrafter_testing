import PageTransition from '@/components/sections/PageTransition';
    import { Button } from '@/components/ui/Button';
    import ClickSpark from '@/components/ui/ClickSpark';
    import { useForm } from 'react-hook-form';
    import { z } from 'zod';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { toast } from 'sonner';

    const contactSchema = z.object({
      name: z.string().min(2, "Name must be at least 2 characters."),
      email: z.string().email("Invalid email address."),
      message: z.string().min(10, "Message must be at least 10 characters."),
    });
    
    type ContactFormValues = z.infer<typeof contactSchema>;

    const ContactPage = () => {
        const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
            resolver: zodResolver(contactSchema),
        });

        const onSubmit = (data: ContactFormValues) => {
            console.log(data);
            toast.success("Message sent! We'll get back to you soon.");
            reset();
        };

      return (
        <PageTransition>
          <div className="container mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="text-center font-heading text-4xl font-bold text-secondary md:text-5xl">Get in Touch</h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
              Have a question or a special request? We'd love to hear from you.
            </p>

            <div className="mt-12 rounded-lg bg-accent/50 p-8 shadow-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
                    <input type="text" id="name" {...register("name")} className="mt-1 block w-full rounded-md border-border bg-background p-2 focus:border-primary focus:ring-primary" />
                    {errors.name && <p className="mt-1 text-sm text-error">{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                    <input type="email" id="email" {...register("email")} className="mt-1 block w-full rounded-md border-border bg-background p-2 focus:border-primary focus:ring-primary" />
                    {errors.email && <p className="mt-1 text-sm text-error">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                    <textarea id="message" rows={5} {...register("message")} className="mt-1 block w-full rounded-md border-border bg-background p-2 focus:border-primary focus:ring-primary"></textarea>
                    {errors.message && <p className="mt-1 text-sm text-error">{errors.message.message}</p>}
                </div>
                <div className="text-right">
                    <ClickSpark>
                        <Button type="submit">Send Message</Button>
                    </ClickSpark>
                </div>
              </form>
            </div>
          </div>
        </PageTransition>
      );
    };

    export default ContactPage;