import React from 'react';
    import { motion } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Program } from '@/types';
    import Button from '../common/Button';

    interface CourseCardProps {
      program: Program;
    }

    const CourseCard: React.FC<CourseCardProps> = ({ program }) => {
      return (
        <motion.div
          className="bg-au-surface rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
          whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 flex-grow">
            <p className="text-au-accent font-semibold text-sm">{program.degree}</p>
            <h3 className="mt-2 text-xl font-bold text-au-primary">{program.name}</h3>
            <p className="mt-2 text-au-text-muted text-sm">{program.description}</p>
          </div>
          <div className="p-6 bg-au-bg-light">
             <Link to={`/academics/programs/${program.id}`}>
                <Button variant="primary" size="small" className="w-full">View Details</Button>
            </Link>
          </div>
        </motion.div>
      );
    };

    export default CourseCard;