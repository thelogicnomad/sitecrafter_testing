import React, { useState, useEffect, useCallback } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Card } from '@/components/ui/Card';
    import { cn, getRandomImageUrl } from '@/lib/utils';
    import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
    import { Button } from '@/components/ui/Button';

    // Dummy Testimonial Type
    interface Testimonial {
      id: string;
      quote: string;
      author: string;
      title?: string;
      avatarUrl?: string; // Changed from 'avatar' to 'avatarUrl' for consistency
      rating: number; // 1-5 stars
    }

    interface TestimonialSliderProps {
      testimonials: Testimonial[];
      interval?: number; // Auto-slide interval in ms
      className?: string;
    }

    const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
      testimonials,
      interval = 5000,
      className,
    }) => {
      const [currentIndex, setCurrentIndex] = useState(0);
      const [direction, setDirection] = useState(0); // 0 for initial, 1 for next, -1 for prev

      const navigate = useCallback(
        (newDirection: number) => {
          setDirection(newDirection);
          setCurrentIndex((prevIndex) => {
            const nextIndex = (prevIndex + newDirection + testimonials.length) % testimonials.length;
            return nextIndex;
          });
        },
        [testimonials.length]
      );

      useEffect(() => {
        if (testimonials.length === 0) return;

        const timer = setInterval(() => {
          navigate(1); // Auto-slide to next
        }, interval);

        return () => clearInterval(timer);
      }, [testimonials, interval, navigate]);

      const variants = {
        enter: (direction: number) => ({
          x: direction > 0 ? '100%' : '-100%',
          opacity: 0,
        }),
        center: {
          x: '0%',
          opacity: 1,
          transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          },
        },
        exit: (direction: number) => ({
          x: direction < 0 ? '100%' : '-100%',
          opacity: 0,
          transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          },
        }),
      };

      if (testimonials.length === 0) {
        return (
          <section className={cn('py-16 text-center text-gray-500', className)}>
            <p>No testimonials to display.</p>
          </section>
        );
      }

      const currentTestimonial = testimonials[currentIndex];

      return (
        <section className={cn('py-16 bg-secondary/10 relative overflow-hidden', className)} aria-labelledby="testimonials-title">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="testimonials-title" className="text-4xl font-bold text-center text-primary mb-12 font-poppins">
              What Our Customers Say
            </h2>

            <div className="relative h-[300px] md:h-[250px] flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute w-full h-full p-4 flex justify-center items-center"
                >
                  <Card className="flex flex-col items-center text-center p-8 bg-white/90 backdrop-blur-sm shadow-lifted">
                    <div className="flex mb-3" aria-label={`Rating: ${currentTestimonial.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-5 w-5',
                            i < currentTestimonial.rating ? 'text-secondary fill-secondary' : 'text-gray-300'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-lg italic text-gray-700 mb-4 font-inter">"{currentTestimonial.quote}"</p>
                    <div className="flex items-center justify-center mt-4">
                      <img
                        src={currentTestimonial.avatarUrl || getRandomImageUrl(50, 50)}
                        alt={`Avatar of ${currentTestimonial.author}`}
                        className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-secondary"
                        width={48}
                        height={48}
                      />
                      <div>
                        <p className="font-semibold text-primary">{currentTestimonial.author}</p>
                        {currentTestimonial.title && <p className="text-sm text-gray-500">{currentTestimonial.title}</p>}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate(-1)}
                aria-label="Previous testimonial"
                className="text-primary hover:bg-primary/10 rounded-r-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate(1)}
                aria-label="Next testimonial"
                className="text-primary hover:bg-primary/10 rounded-l-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    'h-2 w-2 rounded-full transition-all duration-300',
                    index === currentIndex ? 'bg-primary w-6' : 'bg-gray-300 hover:bg-gray-400'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      );
    };

    export { TestimonialSlider };