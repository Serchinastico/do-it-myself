import { Project } from "@app/domain/project/project";
import { t } from "@lingui/macro";
import invariant from "tiny-invariant";

export type ToolType = "attachments" | "manual" | "worklog";

export const INITIAL_MANUAL: Project["manual"] = {
  html: `
<title>${t`Variables`}</title>
<p></p>
<title>${t`Tools and materials`}</title>
<p></p>
<title>${t`Steps`}</title>
<p></p>
`,
};

export const getToolHtml = ({
  project,
  toolType,
}: {
  project: Project;
  toolType: ToolType;
}) => {
  switch (toolType) {
    case "manual":
      invariant(project.manual);
      return project.manual.html;
    default:
      return "";
  }
};
