import { ProjectColorId } from "@app/domain/project/colors";
import { ProjectTagId } from "@app/domain/project/tags";
import { Tagged } from "@madeja-studio/cepillo";

export type LocalMediaAsset =
  | Tagged<"image", LocalImage>
  | Tagged<"video", LocalVideo>;

export type EditedProject = Omit<Project, "id">;

export type LocalVideo = {
  height: number;
  id: string;
  path: string;
  width: number;
};

export type LocalImage = {
  height: number;
  id: string;
  path: string;
  width: number;
};

export interface Project {
  attachments?: { items: LocalMediaAsset[] };
  colorId: ProjectColorId;
  description?: string;
  id: string;
  manual?: { contentHtml: string };
  name: string;
  tagIds: ProjectTagId[];
  worklog?: { contentHtml: string };
}
