import {motion} from 'framer-motion';
const animation = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 60,
  },
  enter: {
    opacity: [0, 1, 0],
    x: [0, 0, 0],
    y: [60, 0, -320],
    transition: {
      duration: 2.2,
      easing: `cubic-bezier(0.76, 0, 0.24, 1)`,
    },
  },
  leave: {
    opacity: 0,
    x: 0,
    y: 60,
  },
};

const Layout = ({children, tearDown}) => {
  return (
    <motion.div
      variants={animation}
      initial={'hidden'}
      animate={'enter'}
      exit={'leave'}
      onAnimationStart={() => {
        console.log('[start]');
      }}
      onAnimationComplete={() => {
        console.log('[end]');
        tearDown();
      }}
    >
      {children}
    </motion.div>
  );
};

export {Layout};
