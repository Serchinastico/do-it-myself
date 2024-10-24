import { BridgeExtension } from "@10play/tentap-editor";

import {
  LocalImage,
  OnImageClickProps,
  SetLocalImagesProps,
} from "./localImage";

type LocalImageEditorState = object;
type LocalImageEditorInstance = {
  setLocalImages: (props: SetLocalImagesProps) => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends LocalImageEditorState {}

  interface EditorBridge extends LocalImageEditorInstance {}
}

export enum LocalImageEditorActionType {
  Click = "local-images-click",
  SetImages = "set-local-images",
}

export type LocalImageMessage =
  | {
      payload: OnImageClickProps;
      type: LocalImageEditorActionType.Click;
    }
  | {
      payload: SetLocalImagesProps;
      type: LocalImageEditorActionType.SetImages;
    };

export const LocalImageBridge = (
  onClick?: (props: OnImageClickProps) => Promise<void> | void
) =>
  new BridgeExtension<
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
    onEditorMessage: (message, _editorBridge) => {
      if (message.type === LocalImageEditorActionType.Click) {
        onClick && onClick(message.payload);
        return true;
      }

      return false;
    },
    tiptapExtension: LocalImage.configure(),
  });
