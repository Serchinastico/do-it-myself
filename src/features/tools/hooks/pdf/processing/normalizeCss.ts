import { HtmlProcessingStep } from "./step";

const PDF_CSS = `
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

export class NormalizeCss extends HtmlProcessingStep {
  process(html: string) {
    return (
      html
        // This is patch to remove a CSS rule that breaks PDF printing
        .replace("#root > div:nth-of-type(1)", ".nothing")
        .replace("/* <END_CSS> */", PDF_CSS)
    );
  }
}
