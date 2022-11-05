import '@/styles/index.css';
import '@/styles/index.scss';
import {CssVarsProvider} from '@mui/joy/styles';
import {customTheme} from '@/config/theme';
import {queryClient} from '@/config/query';
import {QueryClientProvider} from '@tanstack/react-query';

const MyApp = ({Component, pageProps}) => {
  return (
    <CssVarsProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </CssVarsProvider>
  );
};

export default MyApp;
