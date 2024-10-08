import { ProjectColorId } from "@app/domain/project/colors";
import { ProjectTagId } from "@app/domain/project/tags";
import { Tagged } from "@madeja-studio/cepillo";

type ImageAttachment = Tagged<"image", { uri: string }>;

type Attachment = ImageAttachment;

export interface Project {
  attachments?: { items: Attachment[] };
  colorId: ProjectColorId;
  description?: string;
  id: string;
  manual?: { html: string };
  name: string;
  tagIds: ProjectTagId[];
  worklog?: object;
}

export type EditedProject = Omit<Project, "id">;
