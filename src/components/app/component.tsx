import { createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";

import { getDesignTokens } from "./get-design-tokens";

import Welcome from "../welcome";
import { useMemo, useState } from "react";

const Component = () => {
  const [mode] = useState<PaletteMode>('dark');
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  let content = <Welcome />;
  if (!showWelcome) {
    content = (
      <div>Work on this.</div>
    );
  }

  setTimeout(() => {
    setShowWelcome(false);
  }, 3000);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
};

Component.displayName = "App";

export default Component;
