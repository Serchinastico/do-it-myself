import { HtmlProcessingStep } from "./step";

export class AddContent extends HtmlProcessingStep {
  constructor(private toolHtml: string) {
    super();
  }

  process(html: string): string {
    return html.replace(
      '<div id="root"></div>',
      `<div id="root"><div class="tiptap ProseMirror">${this.toolHtml}</div></div>`
    );
  }
}
