import { ColorScheme } from "@app/core/theme/color-scheme";
import { ProjectTagId } from "@app/domain/project";
import { Project } from "@app/domain/project/project";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { atomWithAsyncStorage } from "./async-storage";

export const atoms = {
  colorScheme: atomWithAsyncStorage<ColorScheme | null>("colorScheme", null),
  hasPurchasedApp: atomWithAsyncStorage("hasPurchasedApp", false),
  projects: atomWithAsyncStorage<Project[]>("projects", []),
  /**
   * This atom is transient and used temporarily to synchronize the state
   * between CreateProjectScreen and AddTagsScreen.
   */
  selectedTagIds: atomWithAsyncStorage<ProjectTagId[]>("selectedTagIds", []),
};

export const derivedAtoms = {
  projectAtomFamily: atomFamily((id: string) =>
    atom(
      async (get) =>
        (await get(atoms.projects)).find((project) => project.id === id)!,
      (_get, set, update: Partial<Project>) => {
        set(atoms.projects, async (projects) =>
          (await projects).map((project) =>
            project.id === id ? { ...project, ...update } : project
          )
        );
      }
    )
  ),
};
