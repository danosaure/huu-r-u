import { atom } from "recoil";

export const showWelcomeState = atom<boolean>({
  key: "showWelcome",
  default: true,
});
