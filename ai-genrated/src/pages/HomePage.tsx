import RotatingText from "@/components/bits/RotatingText";

    const HeroSection = () => (
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Ignite Your Potential with</span>
            <span className="block text-primary">Catalyst Courses</span>
          </h1>
          <div className="mt-6 flex justify-center">
             <RotatingText
                texts={['Technology', 'Business', 'Creative Arts', 'Your Future']}
                mainClassName="text-2xl md:text-4xl font-bold bg-accent text-accent-foreground overflow-hidden py-2 px-4 rounded-lg"
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
            />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Master in-demand skills with our project-based courses. Learn from industry experts and build a portfolio that will get you hired.
          </p>
        </div>
      </section>
    );

    export default function HomePage() {
      return (
        <div>
          <HeroSection />
        </div>
      );
    }