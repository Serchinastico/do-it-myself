import { ProjectColorId } from "@app/domain/project/colors";
import { ProjectTagId } from "@app/domain/project/tags";
import { Tagged } from "@madeja-studio/cepillo";

export type LocalImage = {
  height: number;
  id: string;
  path: string;
  width: number;
};

export type Attachment = Tagged<"image", LocalImage>;

export interface Project {
  attachments?: { items: Attachment[] };
  colorId: ProjectColorId;
  description?: string;
  id: string;
  manual?: { html: string };
  name: string;
  tagIds: ProjectTagId[];
  worklog?: { html: string };
}

export type EditedProject = Omit<Project, "id">;
