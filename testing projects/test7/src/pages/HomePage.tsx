import Button from '@/components/common/Button';
import Aurora from '@/components/ui/Aurora';
import CircularGallery from '../components/ui/CircularGallery';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
import ShinyText from '@/components/ui/ShinyText';
import { useLenis } from '@/hooks/useLenis';
import { Award, Feather, Heart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  useLenis();

  const testimonials = [
    { text: "The Triple Chocolate Decadence saved our anniversary party! The detail was unbelievable.", author: "Sarah J." },
    { text: "Absolutely the best wedding cake I've ever tasted. Our guests are still talking about it.", author: "Michael B." },
    { text: "ArtisanBake Co. is my go-to for every birthday. Fresh, delicious, and always beautiful.", author: "Emily R." },
    { text: "The seasonal berry torte was a masterpiece. Light, flavorful, and stunning to look at.", author: "David L." },
    { text: "Customer service was as amazing as the cake. They helped me design the perfect custom cake.", author: "Jessica M." },
  ];

  const features = [
    { icon: Leaf, title: "Purity of Ingredients", description: "We source only from local, sustainable farms to ensure the freshest, most flavorful results." },
    { icon: Feather, title: "Artistry in Every Layer", description: "Our master pastry chefs sculpt every detail by hand, turning each cake into a work of art." },
    { icon: Heart, title: "Baked with Passion", description: "Every cake is baked to order with love and care, never pre-made, guaranteeing ultimate freshness." },
    { icon: Award, title: "Reliability Guaranteed", description: "We pride ourselves on on-time delivery for your most critical events. Your celebration is safe with us." },
  ]

  return (
    <div className="overflow-x-hidden">
      <section className="relative h-screen flex items-center justify-center text-center text-primary-foreground overflow-hidden">
        <Aurora colorStops={["hsl(var(--primary-light))", "hsl(var(--accent))", "hsl(var(--background))"]} />
        <div className="z-10 bg-black/20 p-8 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 text-white">
            <ShinyText text="Handcrafted Elegance," />
          </h1>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white">
            <ShinyText text="Baked for Your Moment." />
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 text-primary-foreground/90">
            From classic flavors to bespoke creations, experience the difference of true artistry. Serving metropolitan areas with same-day delivery options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button as={Link} to="/catalog" variant="primary">Explore Our Menu</Button>
            <Button as={Link} to="/contact" variant="outline" className="text-white border-white">Design Your Dream Cake</Button>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <ScrollStack>
          {features.map((feature, i) => (
            <ScrollStackItem key={i}>
              <div className="flex flex-col items-center">
                <div className="p-4 bg-accent/20 rounded-full mb-4">
                  <feature.icon className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-3xl font-display font-bold text-primary mb-2">{feature.title}</h2>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-12">Loved by Celebrations</h2>
          <CircularGallery items={testimonials} />
        </div>
      </section>

      <section className="py-20 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Delight?</h2>
          <p className="max-w-xl mx-auto mb-8">
            Your next celebration deserves a centerpiece that's as memorable as the occasion itself. Let's create something beautiful together.
          </p>
          <Button as={Link} to="/catalog" variant="primary">Start Your Order</Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;