import { Box, Stack, Typography } from "@mui/material";

import logo from "./HuuRu-logo.png";
import danosaure from "./danosaure-logo.png";
import './style.scss';

const Component = () => {
  return (
    <Stack className="dano--welcome" direction="column" alignItems="stretch">
      <Box className="dano--welcome--body">
        <img className="dano--welcome--body--logo" src={logo} alt="" />
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
};

Component.displayName = "Welcome";

export default Component;
