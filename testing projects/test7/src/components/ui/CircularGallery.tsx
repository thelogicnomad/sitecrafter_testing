import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CircularGalleryItem {
    text: string;
    author: string;
}

interface CircularGalleryProps {
    items: CircularGalleryItem[];
}

const CircularGallery = ({ items }: CircularGalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const timer = setInterval(goToNext, 5000);
        return () => clearInterval(timer);
    }, [items.length]);

    if (!items || items.length === 0) return null;

    const current = items[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            {/* Main Testimonial Display */}
            <div className="w-full max-w-2xl mx-auto px-4">
                <div className="bg-background border border-accent/20 rounded-lg p-8 md:p-12 text-center min-h-48 flex flex-col justify-center">
                    <p className="text-lg md:text-xl text-foreground mb-6 italic">"{current.text}"</p>
                    <p className="text-sm md:text-base font-semibold text-accent">— {current.author}</p>
                </div>
            </div>

            {/* Circular Indicators */}
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={goToPrevious}
                    className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-6 h-6 text-accent" />
                </button>

                <div className="flex gap-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                    ? 'bg-accent w-8'
                                    : 'bg-accent/30 hover:bg-accent/50'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={goToNext}
                    className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-6 h-6 text-accent" />
                </button>
            </div>
        </div>
    );
};

export default CircularGallery;