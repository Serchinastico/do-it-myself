import { color } from "@app/core/theme/color";
import { ExportThemeId } from "@app/domain/project/export";

import { HtmlProcessingStep } from "./step";

const BASE_CSS = `
body {
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 32px;
  padding-bottom: 32px;

  font-size: 12px;

  height: 100%;
}

html {
  height: 100%;
}
`;

const getSwedenCss = (theme: "dark" | "light") => `
h1 {
  text-transform: uppercase;
  font-weight: 900;
  font-size: 2em;
  color: ${theme === "dark" ? color.white : color.ash};
}
`;

const cssForTheme = (themeId: ExportThemeId) => {
  switch (themeId) {
    case "dim":
      return [BASE_CSS];
    case "dimDark":
      return [BASE_CSS];
    case "sweden":
      return [BASE_CSS, getSwedenCss("light")];
    case "swedenDark":
      return [BASE_CSS, getSwedenCss("dark")];
  }
};

export class NormalizeCss extends HtmlProcessingStep {
  constructor(private themeId: ExportThemeId) {
    super();
  }

  process(html: string) {
    return (
      html
        // This is a patch to remove a CSS rule that basically breaks PDF printing
        .replace("#root > div:nth-of-type(1)", ".nothing")
        .replace("/* <END_CSS> */", cssForTheme(this.themeId).join("\n"))
    );
  }
}
