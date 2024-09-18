import { ProjectTagId } from "@app/domain/project";

import { atomWithAsyncStorage } from "./async-storage";

export const atoms = {
  projects: atomWithAsyncStorage<string[]>("projects", []),
  // This atom is created to keep the CreateProjectScreen and AddTagsScreen in sync
  selectedTagIds: atomWithAsyncStorage<ProjectTagId[]>("projects", []),
};
