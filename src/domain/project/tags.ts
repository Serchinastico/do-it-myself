import { t } from "@lingui/macro";

export const PROJECT_TAGS = {
  category: [
    { id: "clay", name: t`clay` },
    { id: "wood", name: t`wood` },
    { id: "electronics", name: t`electronics` },
    { id: "epoxy", name: t`epoxy` },
    { id: "3d_printing", name: t`3d printing` },
    { id: "sewing", name: t`sewing` },
    { id: "paint", name: t`paint` },
    { id: "mix", name: t`mix` },
  ],
  collaboration: [
    { id: "solo", name: t`solo project` },
    { id: "need_help", name: t`need help` },
  ],
} as const;

export type ProjectTags = typeof PROJECT_TAGS;
export type ProjectTagSection = ProjectTags[keyof ProjectTags];
export type ProjectTag = ProjectTagSection[number];
export type ProjectTagId = ProjectTag["id"];

export const getTagsByIds = (ids: ProjectTagId[]): ProjectTag[] => {
  return ids.flatMap((id) =>
    Object.values(PROJECT_TAGS)
      .flat()
      .filter((tag) => tag.id === id)
  );
};
