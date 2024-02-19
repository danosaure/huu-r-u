import { PaletteMode } from "@mui/material";
import { ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => (mode === 'light') ? lightTheme : darkTheme;

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#fb9028',
    },
    secondary: {
      main: '#eabc6f',
    },
    background: {
      paper: '#0e3690',
      default: '#000033',
    },
    text: {
      primary: '#a0c4d0',
      secondary: '#38d22b',
    },
    error: {
      main: '#ef1c0d',
    },
  },
};


const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#fb9028',
    },
    secondary: {
      main: '#eabc6f',
    },
    background: {
      paper: '#0e3690',
      default: '#000033',
    },
    text: {
      primary: '#a0c4d0',
      secondary: '#38d22b',
    },
    error: {
      main: '#ef1c0d',
    },
  },
};

export { getDesignTokens };
