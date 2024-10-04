import { EditorView } from "@tiptap/pm/view";

export const localImageClickHandler = (view: EditorView, pos: number, event: MouseEvent) => {
  if (event.button !== 0) {
    return false;
  }

  let img = event.target as HTMLElement;
  const els = [];

  while (img.nodeName !== "DIV") {
    els.push(img);
    img = img.parentNode as HTMLElement;
  }

  if (!els.find(value => value.nodeName === "IMG")) {
    return false;
  }

  const image = (event.target as HTMLImageElement);

  const fileName = image.dataset["file-name"];
  window.ReactNativeWebView?.postMessage(JSON.stringify({ type: "local-images-click", payload: { fileName } }));

  return true;
};
