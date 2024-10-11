import { BridgeExtension } from "@10play/tentap-editor";

import { Title, ToggleTitleProps } from "./title";

type TitleEditorState = {
  canToggleTitle: boolean;
  isTitleActive: boolean;
};
type TitleEditorInstance = {
  toggleTitle: (props: ToggleTitleProps) => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends TitleEditorState {}

  interface EditorBridge extends TitleEditorInstance {}
}

export enum TitleEditorActionType {
  ToggleTitle = "toggle-title",
}

type TitleMessage = {
  payload: ToggleTitleProps;
  type: TitleEditorActionType.ToggleTitle;
};

export const TitleBridge = new BridgeExtension<
  TitleEditorState,
  TitleEditorInstance,
  TitleMessage
>({
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      toggleTitle: (props: ToggleTitleProps) =>
        sendBridgeMessage({
          payload: props,
          type: TitleEditorActionType.ToggleTitle,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canToggleTitle: editor.can().toggleTitle({ backgroundColor: "#000" }),
      isTitleActive: editor.isActive("title"),
    };
  },
  onBridgeMessage: (editor, message) => {
    if (message.type === TitleEditorActionType.ToggleTitle) {
      editor.chain().focus().toggleTitle(message.payload).run();
    }

    return false;
  },
  tiptapExtension: Title.configure(),
});
