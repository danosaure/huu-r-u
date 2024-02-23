import { atom } from "recoil";

export const doNotShowWelcomeState = atom<boolean>({
  key: "doNotShowWelcome",
  default: false,
});
