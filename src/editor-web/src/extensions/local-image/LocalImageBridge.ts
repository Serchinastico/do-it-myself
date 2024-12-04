import { BridgeExtension } from "@10play/tentap-editor";

import {
  LocalImage,
  OnImageClickProps,
  SetLocalImagesProps,
} from "./localImage";

type LocalImageEditorInstance = {
  setLocalImages: (props: SetLocalImagesProps) => void;
};
type LocalImageEditorState = object;

declare module "@10play/tentap-editor" {
  interface BridgeState extends LocalImageEditorState {}

  interface EditorBridge extends LocalImageEditorInstance {}
}

export enum LocalImageEditorActionType {
  Click = "local-image-click",
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
    onEditorMessage: (message) => {
      if (message.type === LocalImageEditorActionType.Click) {
        onClick?.(message.payload);

        return true;
      }

      return false;
    },
    tiptapExtension: LocalImage.configure(),
  });
