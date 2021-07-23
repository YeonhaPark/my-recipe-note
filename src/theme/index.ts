import { createTheme } from '@material-ui/core/styles';
import {
  black,
  indigo,
  indigoLight,
  yellow,
  yellowLight,
  orange,
  red,
  gray,
} from './colors';

const theme = createTheme({
  palette: {
    primary: {
      main: black,
      light: gray,
    },
    secondary: {
      main: indigo,
      light: indigoLight,
    },
    warning: {
      main: yellow,
      light: yellowLight,
    },
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          marginBottom: '0.5rem',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
