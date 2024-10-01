import { BridgeExtension } from "@10play/tentap-editor";

import { LocalImage, SetLocalImagesProps } from "./localImage";

type LocalImageEditorState = object;
type LocalImageEditorInstance = {
  setLocalImages: (props: SetLocalImagesProps) => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends LocalImageEditorState {}

  interface EditorBridge extends LocalImageEditorInstance {}
}

export enum LocalImageEditorActionType {
  SetImages = "set-local-images",
}

type LocalImageMessage = {
  payload: SetLocalImagesProps;
  type: LocalImageEditorActionType.SetImages;
};

export const LocalImageBridge = new BridgeExtension<
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
  extendEditorState: (editor) => {
    return {};
  },
  onBridgeMessage: (editor, message) => {
    if (message.type === LocalImageEditorActionType.SetImages) {
      editor.chain().focus().setLocalImages(message.payload).run();
    }

    return false;
  },
  tiptapExtension: LocalImage.configure(),
});
