import { formatDate } from "@app/core/utils/date";
import {
  getProjectColorById,
  ProjectColorId,
} from "@app/domain/project/colors";
import { Project } from "@app/domain/project/project";
import { t } from "@lingui/macro";
import * as cheerio from "cheerio";
import dayjs from "dayjs";
import invariant from "tiny-invariant";

export type ToolType = "attachments" | "manual" | "worklog";

const getTitleHtml = (text: string, colorId: ProjectColorId) => `
<div class="title">
  <div class="skew" style="background-color: ${getProjectColorById(colorId).hex};"></div>
  <h1 class="content">${text}</h1>
</div>
`;

const getDateHtml = (text: string, colorId: ProjectColorId) => `
<div class="date" data-id="00000000-0000-0000-0000-000000000000">
  <div class="skew" style="background-color: ${getProjectColorById(colorId).hex};"></div>
  <h1 class="content" data-date="${dayjs().toISOString()}">${text}</h1>
</div>
`;

const getParagraphHtml = (text: string = "") => `
<p>${text}</p>
`;

export const getInitialManual = (
  colorId: ProjectColorId
): Project["manual"] => ({
  contentHtml: `
${getTitleHtml(t`Introduction`, colorId)}
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

/**
 * Normalizes date elements in the provided HTML string by converting dates into a more readable format.
 * We do it in the React Native code to centralize translations and have date/l10n configuration in
 * one place.
 *
 * @param html - A string representing the HTML to be processed.
 * @returns The HTML string with normalized date elements.
 *
 * Example usage:
 *
 * const inputHtml = `
 *   <div class="date" data-date="2023-10-10T12:00:00Z">
 *     <h1>10 Oct 2023</h1>
 *   </div>`;
 *
 * console.log(normalize(inputHtml));
 * // Output might be:
 * // <div class="date" data-date="2023-10-10T12:00:00Z">
 * //   <h1>Today</h1>
 * // </div>
 */
const normalize = (html: string): string => {
  const $ = cheerio.load(html);
  const $dates = $(".date h1");

  for (const $date of $dates) {
    const date = $date.attribs["data-date"];
    $($date).text(formatDate(date));
  }

  return $.html();
};

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
      return normalize(project.worklog.contentHtml);
    default:
      return "";
  }
};
