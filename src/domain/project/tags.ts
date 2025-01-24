import { i18n } from "@lingui/core";

export const PROJECT_TAGS = {
  category: [
    { getName: () => i18n._(`build`), id: "build" },
    { getName: () => i18n._(`design`), id: "design" },
    { getName: () => i18n._(`fix`), id: "fix" },
    { getName: () => i18n._(`mount/unmount`), id: "mount_unmount" },
    { getName: () => i18n._(`chore`), id: "chore" },
  ],
  collaboration: [
    { getName: () => i18n._(`solo project`), id: "solo" },
    { getName: () => i18n._(`need help`), id: "need_help" },
  ],
  complexity: [
    { getName: () => i18n._(`complexity:easy`), id: "complexity:easy" },
    { getName: () => i18n._(`complexity:medium`), id: "complexity:medium" },
    { getName: () => i18n._(`complexity:hard`), id: "complexity:hard" },
  ],
  duration: [
    { getName: () => i18n._(`duration:short`), id: "duration:short" },
    { getName: () => i18n._(`duration:medium`), id: "duration:medium" },
    { getName: () => i18n._(`duration:long`), id: "duration:long" },
  ],
  medium: [
    { getName: () => i18n._(`clay`), id: "clay" },
    { getName: () => i18n._(`wood`), id: "wood" },
    { getName: () => i18n._(`paper`), id: "paper" },
    { getName: () => i18n._(`electronics`), id: "electronics" },
    { getName: () => i18n._(`epoxy`), id: "epoxy" },
    { getName: () => i18n._(`3d printing`), id: "3d_printing" },
    { getName: () => i18n._(`CNC`), id: "cnc" },
    { getName: () => i18n._(`sewing`), id: "sewing" },
    { getName: () => i18n._(`paint`), id: "paint" },
    { getName: () => i18n._(`mixed medium`), id: "mixed medium" },
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
