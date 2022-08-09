import {motion, AnimatePresence} from 'framer-motion';

const variants = {
  hidden: {opacity: 0, x: 0, y: 20},
  enter: {opacity: 1, x: 0, y: 0},
  exit: {opacity: 0, x: 0, y: -20},
};

const Layout = ({children}) => {
  return (
    <>
      <AnimatePresence>
        <motion.main
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{duration: 0.4, type: 'easeInOut'}}
          style={{position: 'relative', padding: '0 2vw'}}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
};

export {Layout};
