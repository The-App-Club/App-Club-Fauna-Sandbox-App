import '@/styles/index.css';
import '@/styles/index.scss';
import {CssVarsProvider} from '@mui/joy/styles';
import {customTheme} from '@/config/theme';

import {Context, createClient, Provider} from 'urql';
import {useContext} from 'react';

const client = createClient({
  url: 'https://graphql.fauna.com/graphql',
  fetchOptions: () => {
    return {
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNADB_SECRET}`,
      },
    };
  },
});

export const useGraphqlClinet = () => {
  return useContext(Context);
};

const MyApp = ({Component, pageProps}) => {
  return (
    <Provider value={client}>
      <CssVarsProvider theme={customTheme}>
        <Component {...pageProps} />
      </CssVarsProvider>
    </Provider>
  );
};

export default MyApp;
