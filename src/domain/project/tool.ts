import { Project } from "@app/domain/project/project";
import { t } from "@lingui/macro";

export type ToolType = "attachments" | "manual" | "worklog";

const FALLBACK_MANUAL_HTML = `
<title>${t`Variables`}</title>
<p></p>
<title>${t`Tools and materials`}</title>
<p></p>
<title>${t`Steps`}</title>
<p></p>
`;

export const getToolHtml = ({
  project,
  toolType,
}: {
  project: Project;
  toolType: ToolType;
}) => {
  switch (toolType) {
    case "manual":
      return project.manual?.html?.length === 0
        ? FALLBACK_MANUAL_HTML
        : project.manual?.html;
    default:
      return "";
  }
};
