import { atomWithAsyncStorage } from "./async-storage";

export const atoms = {
  projects: atomWithAsyncStorage<string[]>("projects", []),
};
