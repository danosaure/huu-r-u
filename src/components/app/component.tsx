import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';

import { getDesignTokens } from './get-design-tokens';

import Welcome from '../welcome';
import { useShowWelcomeValue, useUserPreferences } from '../../states';

const Component = () => {
  const userPreferences = useUserPreferences();
  const showWelcome = useShowWelcomeValue();

  const theme = useMemo(() => createTheme(getDesignTokens(userPreferences?.theme || 'dark')), [userPreferences?.theme]);

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

Component.displayName = 'Dano.App';

export default Component;
