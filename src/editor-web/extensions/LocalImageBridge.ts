import { BridgeExtension } from "@10play/tentap-editor";

import { LocalImage, OnImageClickProps, SetLocalImagesProps } from "./localImage";

type LocalImageEditorState = object;
type LocalImageEditorInstance = {
  setLocalImages: (props: SetLocalImagesProps) => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends LocalImageEditorState {
  }

  interface EditorBridge extends LocalImageEditorInstance {
  }
}

export enum LocalImageEditorActionType {
  SetImages = "set-local-images",
  Click = "local-images-click",
}

export type LocalImageMessage = {
  payload: SetLocalImagesProps;
  type: LocalImageEditorActionType.SetImages;
} | {
  payload: OnImageClickProps;
  type: LocalImageEditorActionType.Click
};

export const LocalImageBridge = (onImageClick?: (fileName: string) => void | Promise<void>) => new BridgeExtension<
  LocalImageEditorState,
  LocalImageEditorInstance,
  LocalImageMessage
>({
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      setLocalImages: (props: SetLocalImagesProps) =>
        sendBridgeMessage({
          payload: props,
          type: LocalImageEditorActionType.SetImages,
        }),
    };
  },
  onBridgeMessage: (editor, message) => {
    if (message.type === LocalImageEditorActionType.SetImages) {
      editor.chain().focus().setLocalImages(message.payload).run();
      return true;
    }

    return false;
  },
  onEditorMessage: (message, editorBridge) => {
    if (message.type === LocalImageEditorActionType.Click) {
      onImageClick && onImageClick(message.payload.fileName);
      return true;
    }

    return false;
  },
  tiptapExtension: LocalImage.configure(),
});
