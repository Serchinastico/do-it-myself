import { BridgeExtension } from "@10play/tentap-editor";

import { LocalImage, SetLocalImageProps } from "./localImage";

type LocalImageEditorState = object;
type LocalImageEditorInstance = {
  setLocalImage: (props: SetLocalImageProps) => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends LocalImageEditorState {}

  interface EditorBridge extends LocalImageEditorInstance {}
}

export enum LocalImageEditorActionType {
  SetImage = "set-local-image",
}

type LocalImageMessage = {
  payload: { base64: string; uri: string };
  type: LocalImageEditorActionType.SetImage;
};

export const LocalImageBridge = new BridgeExtension<
  LocalImageEditorState,
  LocalImageEditorInstance,
  LocalImageMessage
>({
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      setLocalImage: (props: SetLocalImageProps) =>
        sendBridgeMessage({
          payload: props,
          type: LocalImageEditorActionType.SetImage,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {};
  },
  onBridgeMessage: (editor, message) => {
    if (message.type === LocalImageEditorActionType.SetImage) {
      editor.chain().focus().setLocalImage(message.payload).run();
    }

    return false;
  },
  tiptapExtension: LocalImage.configure(),
});
