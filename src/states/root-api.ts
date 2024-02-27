import { atom, useRecoilValue } from "recoil";
import { RootApiType } from "../api-types";
import { getRootApi } from "../api-gateway";

export const rootApiState = atom<RootApiType>({
  key: "rooApi",
  default: getRootApi(),
});

export const useRootApi = () => useRecoilValue(rootApiState);
