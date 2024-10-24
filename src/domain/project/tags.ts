import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

export const PROJECT_TAGS = {
  category: [
    { id: "build", name: t(i18n)`build` },
    { id: "design", name: t(i18n)`design` },
    { id: "fix", name: t(i18n)`fix` },
    { id: "mount_unmount", name: t(i18n)`mount/unmount` },
    { id: "chore", name: t(i18n)`chore` },
  ],
  collaboration: [
    { id: "solo", name: t(i18n)`solo project` },
    { id: "need_help", name: t(i18n)`need help` },
  ],
  complexity: [
    { id: "complexity:easy", name: t(i18n)`complexity:easy` },
    { id: "complexity:medium", name: t(i18n)`complexity:medium` },
    { id: "complexity:hard", name: t(i18n)`complexity:hard` },
  ],
  duration: [
    { id: "duration:short", name: t(i18n)`duration:short` },
    { id: "duration:medium", name: t(i18n)`duration:medium` },
    { id: "duration:long", name: t(i18n)`duration:long` },
  ],
  medium: [
    { id: "clay", name: t(i18n)`clay` },
    { id: "wood", name: t(i18n)`wood` },
    { id: "electronics", name: t(i18n)`electronics` },
    { id: "epoxy", name: t(i18n)`epoxy` },
    { id: "3d_printing", name: t(i18n)`3d printing` },
    { id: "cnc", name: t(i18n)`CNC` },
    { id: "sewing", name: t(i18n)`sewing` },
    { id: "paint", name: t(i18n)`paint` },
    { id: "mixed medium", name: t(i18n)`mixed medium` },
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
