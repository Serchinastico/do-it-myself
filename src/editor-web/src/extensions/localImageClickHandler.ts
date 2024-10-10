import { EditorView } from "@tiptap/pm/view";

export const localImageClickHandler = (
  view: EditorView,
  pos: number,
  event: MouseEvent
) => {
  if (event.button !== 0) {
    return false;
  }

  let parent: HTMLElement = event.target as HTMLElement;

  /**
   * We traverse the hierarchy up until we find the masonry div that holds
   * the group id for all the images.
   */
  while (!parent.dataset["group-id"]) {
    parent = parent.parentNode as HTMLElement;
  }

  const groupId = parent.dataset["group-id"];
  if (!groupId) {
    return false;
  }

  const image = event.target as HTMLImageElement;

  const fileName = image.dataset["file-name"];
  window.ReactNativeWebView?.postMessage(
    JSON.stringify({
      payload: { fileName, groupId },
      type: "local-images-click",
    })
  );

  return true;
};
