import Middleware from '@/components/Middleware';
import '@/styles/index.css';
import '@/styles/index.scss';
import {CssVarsProvider} from '@mui/joy/styles';
import {customTheme} from '@/config/theme';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NiceBebop = ({Component, pageProps}) => {
  return (
    <CssVarsProvider theme={customTheme}>
      <ToastContainer />
      <Middleware>
        <Component {...pageProps} />
      </Middleware>
    </CssVarsProvider>
  );
};

export default NiceBebop;
