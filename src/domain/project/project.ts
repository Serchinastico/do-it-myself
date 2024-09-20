import { ProjectColorId } from "@app/domain/project/colors";
import { ProjectTagId } from "@app/domain/project/tags";

export interface Project {
  attachments?: object;
  colorId: ProjectColorId;
  description?: string;
  id: string;
  manual?: object;
  name: string;
  tagIds: ProjectTagId[];
  worklog?: object;
}

export type EditedProject = Omit<Project, "id">;
