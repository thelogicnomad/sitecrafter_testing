import { motion } from 'framer-motion';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="container mx-auto max-w-7xl"
  >
    {children}
  </motion.div>
);

export default PageWrapper;