import React from 'react';
import { motion } from 'framer-motion';

// Fades and lifts a section into view once. Reduced-motion users get it
// instantly via the global prefers-reduced-motion rule in index.css.
const MotionWrap = (Component, classNames) => function HOC() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={classNames}
    >
      <Component />
    </motion.div>
  );
};

export default MotionWrap;
