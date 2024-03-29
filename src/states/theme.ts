import { PaletteMode } from '@mui/material';
import { atom } from 'recoil';

export const themeState = atom<PaletteMode>({
  key: 'theme',
  default: 'dark',
});
