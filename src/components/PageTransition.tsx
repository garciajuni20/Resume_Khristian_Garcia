import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } }}
      // The exit is quick: the ink sheet (InkTransition) covers the change anyway
      exit={{ opacity: 0, transition: { duration: 0.14, ease: [0.23, 1, 0.32, 1] } }}
    >
      {children}
    </motion.div>
  );
}
