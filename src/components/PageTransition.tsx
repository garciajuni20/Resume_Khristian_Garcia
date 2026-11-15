import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  return (
    <motion.div
      // A short fade only: the ink sheet (InkTransition) carries the change, and a
      // slide or a long fade under it would show the page washed out in the bloom
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] } }}
    >
      {children}
    </motion.div>
  );
}
