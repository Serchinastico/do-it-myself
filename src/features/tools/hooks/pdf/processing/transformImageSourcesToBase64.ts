import { readAsStringAsync } from "expo-file-system";

import { HtmlProcessingStep } from "./step";

export class TransformImageSourcesToBase64 extends HtmlProcessingStep {
  async process(html: string) {
    const matches = html.matchAll(/src="(file:\/\/[^"]+)"/g);

    let processedHtml = html;
    for (const match of matches) {
      const path = match[1];
      const base64Data = await readAsStringAsync(path, {
        encoding: "base64",
      });
      const base64Src = `data:image/png;base64,${base64Data}`;

      processedHtml = processedHtml.replace(path, base64Src);
    }

    return processedHtml;
  }
}
