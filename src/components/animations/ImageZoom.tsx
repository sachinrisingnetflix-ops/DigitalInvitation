import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface ImageZoomProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export function ImageZoom({
  children,
  className = '',
  scale = 1.08,
  duration = 0.7,
}: ImageZoomProps) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      whileHover="hover"
      initial="rest"
    >
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale },
        }}
        transition={{
          duration,
          ease: [0.23, 1, 0.32, 1],
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
