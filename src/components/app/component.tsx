import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";

import { getDesignTokens } from "./get-design-tokens";

import Welcome from "../welcome";
import { showWelcomeState, themeState } from "../../states";

const Component = () => {
  const mode = useRecoilValue(themeState);
  const showWelcome = useRecoilValue(showWelcomeState);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  let content;
  if (showWelcome) {
    content = <Welcome />;
  } else {
    content = <div>Work on this.</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
};

Component.displayName = "Dano.App";

export default Component;
