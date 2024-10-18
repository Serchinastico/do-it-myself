import { t } from "@lingui/macro";

export const PROJECT_TAGS = {
  category: [
    { id: "build", name: t`build` },
    { id: "design", name: t`design` },
    { id: "fix", name: t`fix` },
    { id: "mount_unmount", name: t`mount/unmount` },
    { id: "chore", name: t`chore` },
  ],
  collaboration: [
    { id: "solo", name: t`solo project` },
    { id: "need_help", name: t`need help` },
  ],
  complexity: [
    { id: "easy", name: t`easy` },
    { id: "medium_difficulty", name: t`medium` },
    { id: "hard", name: t`hard` },
  ],
  duration: [
    { id: "short", name: t`short` },
    { id: "medium_duration", name: t`medium` },
    { id: "long", name: t`long` },
  ],
  medium: [
    { id: "clay", name: t`clay` },
    { id: "wood", name: t`wood` },
    { id: "electronics", name: t`electronics` },
    { id: "epoxy", name: t`epoxy` },
    { id: "3d_printing", name: t`3d printing` },
    { id: "cnc", name: t`CNC` },
    { id: "sewing", name: t`sewing` },
    { id: "paint", name: t`paint` },
    { id: "mixed medium", name: t`mixed medium` },
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
