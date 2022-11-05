// import '@fontsource/inter';
// import '@fontsource/kosugi';
import '@fontsource/noto-sans-jp';

import {extendTheme} from '@mui/joy/styles';
const customTheme = extendTheme({
  fontFamily: {
    // body: 'Kosugi, sans-serif',
    // body: 'Inter, sans-serif',
    body: 'Noto Sans JP, sans-serif',
  },
});

export {customTheme};
