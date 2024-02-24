import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { getDesignTokens } from "./get-design-tokens";

import Welcome from "../welcome";
import { showWelcomeState, themeState } from "../../states";
import { getUserPreference } from "../../api-gateway";

const Component = () => {
  const mode = useRecoilValue(themeState);
  const [showWelcome, setShowWelcome] = useRecoilState(showWelcomeState);

  useEffect(() => {
    (async () => {
      const persistentShowWelcome = await getUserPreference('showWelcome');
      console.log(`persistentShowWelcome: (${typeof persistentShowWelcome})=`, persistentShowWelcome);
      if (persistentShowWelcome !== undefined && persistentShowWelcome !== showWelcome) {
        setShowWelcome(persistentShowWelcome);
      }
    })();
  }, []);

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
