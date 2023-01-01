import '@fontsource/inter'
import '@fontsource/radio-canada'
import '@fontsource/noto-sans-jp'

import { extendTheme } from '@mui/joy/styles'
import colors from 'tailwindcss/colors'

// https://github.com/d3/d3-scale-chromatic
// https://github.com/Evercoder/culori
// https://observablehq.com/@d3/color-schemes
// https://mui.com/joy-ui/react-button/
// https://tailwindcss.com/docs/customizing-colors
// https://tailwind.ink/code
const theme = extendTheme({
  fontFamily: {
    body: '"Noto Sans JP", serif',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          ...colors.sky,
        },
        neutral: {
          ...colors.gray,
        },
        danger: {
          ...colors.red,
        },
        info: {
          ...colors.slate,
        },
        success: {
          ...colors.green,
        },
        warning: {
          ...colors.amber,
        },
      },
    },
  },
  components: {
    JoyLink: {
      styleOverrides: {
        root: {
          display: 'block',
          color: '#000000',
          fontFamily: '"Noto Sans JP", sans-serif',
        },
      },
    },
    JoyTypography: {
      styleOverrides: {
        root: {
          fontFamily: '"Noto Sans JP", sans-serif',
        },
      },
    },
    JoyFormLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: '1.5rem' /* 24px */,
      lineHeight: '2rem' /* 32px */,
    },
    h2: {
      fontSize: '1.25rem' /* 20px */,
      lineHeight: '1.75rem' /* 28px */,
    },
    h3: {
      fontSize: '1.125rem' /* 18px */,
      lineHeight: '1.75rem' /* 28px */,
    },
    display1: {
      fontFamily: 'Inter, sans-serif',
    },
    display2: {
      fontFamily: '"Radio Canada", sans-serif',
    },
  },
})

export default theme
