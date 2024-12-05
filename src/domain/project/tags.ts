import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

export const PROJECT_TAGS = {
  category: [
    { getName: () => t(i18n)`build`, id: "build" },
    { getName: () => t(i18n)`design`, id: "design" },
    { getName: () => t(i18n)`fix`, id: "fix" },
    { getName: () => t(i18n)`mount/unmount`, id: "mount_unmount" },
    { getName: () => t(i18n)`chore`, id: "chore" },
  ],
  collaboration: [
    { getName: () => t(i18n)`solo project`, id: "solo" },
    { getName: () => t(i18n)`need help`, id: "need_help" },
  ],
  complexity: [
    { getName: () => t(i18n)`complexity:easy`, id: "complexity:easy" },
    { getName: () => t(i18n)`complexity:medium`, id: "complexity:medium" },
    { getName: () => t(i18n)`complexity:hard`, id: "complexity:hard" },
  ],
  duration: [
    { getName: () => t(i18n)`duration:short`, id: "duration:short" },
    { getName: () => t(i18n)`duration:medium`, id: "duration:medium" },
    { getName: () => t(i18n)`duration:long`, id: "duration:long" },
  ],
  medium: [
    { getName: () => t(i18n)`clay`, id: "clay" },
    { getName: () => t(i18n)`wood`, id: "wood" },
    { getName: () => t(i18n)`paper`, id: "paper" },
    { getName: () => t(i18n)`electronics`, id: "electronics" },
    { getName: () => t(i18n)`epoxy`, id: "epoxy" },
    { getName: () => t(i18n)`3d printing`, id: "3d_printing" },
    { getName: () => t(i18n)`CNC`, id: "cnc" },
    { getName: () => t(i18n)`sewing`, id: "sewing" },
    { getName: () => t(i18n)`paint`, id: "paint" },
    { getName: () => t(i18n)`mixed medium`, id: "mixed medium" },
  ],
} as const;

export type ProjectTag = ProjectTagSection[number];
export type ProjectTagId = ProjectTag["id"];
export type ProjectTags = typeof PROJECT_TAGS;
export type ProjectTagSection = ProjectTags[keyof ProjectTags];

export const getTagsByIds = (ids: ProjectTagId[]): ProjectTag[] => {
  return ids.flatMap((id) =>
    Object.values(PROJECT_TAGS)
      .flat()
      .filter((tag) => tag.id === id)
  );
};
