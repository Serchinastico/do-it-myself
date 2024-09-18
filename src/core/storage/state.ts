import { ProjectTagId } from "@app/domain/project";
import { Project } from "@app/domain/project/project";

import { atomWithAsyncStorage } from "./async-storage";

export const atoms = {
  projects: atomWithAsyncStorage<Project[]>("projects", []),
  // This atom is created to keep the CreateProjectScreen and AddTagsScreen in sync
  selectedTagIds: atomWithAsyncStorage<ProjectTagId[]>("selectedTagIds", []),
};
