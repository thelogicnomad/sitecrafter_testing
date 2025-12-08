import { motion } from "framer-motion";
    import { Star } from "lucide-react";
    import type { Course } from "@/types";
    import { Button } from "./ui/Button";

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    export const CourseCard = ({ course }: { course: Course }) => {
        return (
            <motion.div 
              variants={cardVariants}
              className="bg-card rounded-lg shadow-lg overflow-hidden border border-border h-full flex flex-col group"
            >
                <div className="overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-semibold text-primary uppercase">{course.category}</span>
                    <h3 className="text-lg font-bold font-heading mt-2 text-foreground">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">by {course.instructor}</p>
                    <div className="flex items-center mt-4 text-sm">
                        <span className="text-accent font-bold">{course.rating}</span>
                        <div className="flex ml-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < Math.round(course.rating) ? 'text-accent fill-current' : 'text-muted'}`} />
                            ))}
                        </div>
                        <span className="text-muted-foreground ml-2">({course.students})</span>
                    </div>
                    <div className="mt-auto pt-6 flex justify-between items-center">
                        <span className="text-2xl font-bold font-heading text-foreground">{course.price}</span>
                        <Button size="sm">Enroll Now</Button>
                    </div>
                </div>
            </motion.div>
        );
    }