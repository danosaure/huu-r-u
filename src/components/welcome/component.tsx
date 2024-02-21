import { Box, Button, Stack, Typography } from "@mui/material";
import { useRecoilState } from "recoil";

import logo from "./HuuRu-logo.png";
import danosaure from "./danosaure-logo.png";
import './style.scss';
import { showWelcomeState } from "../../features/show-welcome";

const Component = () => {
  const [showWelcome, setShowWelcome] = useRecoilState(showWelcomeState);

  if (showWelcome) {
    return (
      <Stack className="dano--welcome" direction="column" alignItems="stretch">
        <Box className="dano--welcome--body">
          <img className="dano--welcome--body--logo" src={logo} alt="" />
          <Button onClick={() => setShowWelcome(false)} variant="contained">Enter App</Button>
        </Box>
  
        <Stack
          className="dano--welcome--footer"
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography className="dano--welcome--footer--text">by</Typography>
          <img className="dano--welcome--footer--logo" src={danosaure} alt="@danosaure" />
        </Stack>
      </Stack>
    );
  }

  return null;
};

Component.displayName = "Dano.Welcome";

export default Component;
