import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface ShowWelcome {
  show: boolean;
}

const initialState: ShowWelcome = {
  show: true,
};

export const showWelcomeSlice = createSlice({
  name: "showWelcome",
  initialState,
  reducers: {
    welcomeHidden: (state) => {
      state.show = false;
    },
  },
});

export const { welcomeHidden } = showWelcomeSlice.actions;

export const showWelcome = (state: RootState) => state.showWelcome.show;

export default showWelcomeSlice.reducer;
