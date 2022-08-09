import { motion } from 'framer-motion';
import { css } from '@emotion/css';
import { Header } from '../components/header';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 },
};

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, type: 'easeInOut' }}
        style={{ position: 'relative' }}
        className={css`
          margin: 10vh auto 0;
          max-width: 400px;
          width: 100%;
          @media screen and (max-width: 768px) {
            margin: 0 auto;
            max-width: 100%;
          }
        `}
      >
        {children}
      </motion.main>
    </>
  );
};

export { Layout };
