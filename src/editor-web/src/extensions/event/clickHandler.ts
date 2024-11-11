import { EditorView } from "@tiptap/pm/view";

export const clickHandler = (
  _view: EditorView,
  _pos: number,
  event: MouseEvent
) => {
  if (event.button !== 0) {
    return false;
  }

  const dataProps: Record<string, any> = {};
  let clickEvent: string | undefined = undefined;
  let parent: HTMLElement = event.target as HTMLElement;

  /**
   * We traverse the hierarchy up until we find an element that holds the
   * data-click-event attribute. In the process, we collect all the data-*
   * attributes to send them up in the postMessage call.
   */
  while (parent && !clickEvent) {
    clickEvent = parent?.dataset?.["click-event"];
    Object.assign(dataProps, parent.dataset);
    parent = parent.parentNode as HTMLElement;
  }

  if (!parent) {
    return false;
  }

  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      payload: dataProps,
      type: `${clickEvent}-click`,
    })
  );

  return true;
};
