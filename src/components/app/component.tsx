import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";

import { getDesignTokens } from "./get-design-tokens";

import Welcome from "../welcome";
import { useMemo, useState } from "react";

const Component = () => {
  const [mode] = useState<PaletteMode>('dark');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Welcome />
    </ThemeProvider>
  );
};

Component.displayName = "App";

export default Component;
