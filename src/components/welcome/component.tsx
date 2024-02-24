import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";

import logo from "./HuuRu-logo.png";
import danosaure from "./danosaure-logo.png";
import "./style.scss";
import { doNotShowWelcomeState, showWelcomeState } from "../../states";
import { updateUserPreference } from "../../api-gateway";

const Component = () => {
  const [doNotShowWelcomeChecked, setDoNotShowWelcome] = useRecoilState(
    doNotShowWelcomeState
  );
  const setShowWelcome = useSetRecoilState(showWelcomeState);

  const toggle = () => setDoNotShowWelcome(!doNotShowWelcomeChecked);

  const closeWelcomePage = async () => {
    if (doNotShowWelcomeChecked) {
      await updateUserPreference('showWelcome', !doNotShowWelcomeChecked);
    }
    setShowWelcome(false);
  };

  return (
    <Stack className="dano--welcome" direction="column" alignItems="stretch">
      <Box className="dano--welcome--body">
        <img className="dano--welcome--body--logo" src={logo} alt="" />
        <Typography align="left">
          This application is a melting pot for professional, personal,
          familial, or any type of relationships.
        </Typography>
        <Alert severity="warning" variant="outlined">
          All the data resides on your browser. No data is ever sent or saved on
          an external server.
        </Alert>
        <FormGroup className="dano--welcome--body--do-not-show-again">
          <FormControlLabel
            control={<Checkbox onChange={toggle} size="small" />}
            label="Do not show welcome page"
          />
        </FormGroup>
        <Button onClick={closeWelcomePage} variant="contained">
          Enter App
        </Button>
      </Box>

      <Stack
        className="dano--welcome--footer"
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Typography className="dano--welcome--footer--text">by</Typography>
        <img
          className="dano--welcome--footer--logo"
          src={danosaure}
          alt="@danosaure"
        />
      </Stack>
    </Stack>
  );
};

Component.displayName = "Dano.Welcome";

export default Component;
