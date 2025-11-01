import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const ListingsPage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12"
    >
      <h1 className="text-4xl font-bold">Property Listings</h1>
      <p className="mt-2 text-muted-foreground">Browse our available properties.</p>
    </motion.div>
  );
};

export default ListingsPage;