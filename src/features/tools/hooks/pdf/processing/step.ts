export abstract class HtmlProcessingStep {
  abstract process(html: string): Promise<string> | string;
}
