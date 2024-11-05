import { ExportThemeId } from "@app/domain/project/export";

import { HtmlProcessingStep } from "./step";

export class RemoveTitleBackground extends HtmlProcessingStep {
  constructor(private themeId: ExportThemeId) {
    super();
  }

  process(html: string): Promise<string> | string {
    console.log(html);
    switch (this.themeId) {
      case "dim":
      case "dimDark":
        return html;
      case "sweden":
      case "swedenDark":
        // Remove all hardcoded background color lines (for titles)
        return html.replaceAll(
          /style="background-color: rgb\(\d+, \d+, \d+\);"/g,
          ""
        );
    }
  }
}
