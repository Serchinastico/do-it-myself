import {
  ProjectColorId,
  getProjectColorById,
} from "@app/domain/project/colors";
import { Project } from "@app/domain/project/project";
import { t } from "@lingui/macro";
import invariant from "tiny-invariant";

export type ToolType = "attachments" | "manual" | "worklog";

const getTitleHtml = (text: string, colorId: ProjectColorId) => `
<div class="title">
  <div class="skew" style="background-color: ${getProjectColorById(colorId).hex};"></div>
  <h1 class="content">${text}</h1>
</div>
`;

const getDateHtml = (text: string, colorId: ProjectColorId) => `
<div class="date">
  <div class="skew" style="background-color: ${getProjectColorById(colorId).hex};"></div>
  <h1 class="content">${text}</h1>
</div>
`;

const getParagraphHtml = (text: string = "") => `
<p>${text}</p>
`;

export const getInitialManual = (
  colorId: ProjectColorId
): Project["manual"] => ({
  contentHtml: `
${getTitleHtml(t`Variables`, colorId)}
${getParagraphHtml()}
${getTitleHtml(t`Tools and materials`, colorId)}
${getParagraphHtml()}
${getTitleHtml(t`Steps`, colorId)}
${getParagraphHtml()}
`,
});

export const getInitialWorklog = (
  colorId: ProjectColorId
): Project["worklog"] => ({
  contentHtml: `
${getDateHtml(t`Today`, colorId)}
${getParagraphHtml()}
`,
});

export const getToolEditorContent = ({
  project,
  toolType,
}: {
  project: Project;
  toolType: ToolType;
}) => {
  switch (toolType) {
    case "manual":
      invariant(project.manual);
      return project.manual.contentHtml;
    case "worklog":
      invariant(project.worklog);
      return project.worklog.contentHtml;
    default:
      return "";
  }
};
