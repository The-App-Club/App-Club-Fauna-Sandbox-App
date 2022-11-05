import '@/styles/index.css';
import '@/styles/index.scss';
import {CssVarsProvider} from '@mui/joy/styles';
import {customTheme} from '@/config/theme';

const MyApp = ({Component, pageProps}) => {
  return (
    <CssVarsProvider theme={customTheme}>
      <Component {...pageProps} />
    </CssVarsProvider>
  );
};

export default MyApp;
