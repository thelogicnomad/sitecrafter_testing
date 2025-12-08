import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const ClickSpark = ({ children }: { children: ReactNode }) => {
    // This is a simplified wrapper. A full implementation is more complex.
    // For this project, we'll add a visual effect on the button itself.
    return (
        <motion.div whileTap={{ scale: 0.95 }}>
            {children}
        </motion.div>
    );
};

export default ClickSpark;