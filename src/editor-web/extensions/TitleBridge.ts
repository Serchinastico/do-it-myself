import { BridgeExtension } from "@10play/tentap-editor";

import { Title } from "./title";

type TitleEditorState = {
  canToggleTitle: boolean;
  isTitleActive: boolean;
};
type TitleEditorInstance = {
  toggleTitle: () => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends TitleEditorState {}

  interface EditorBridge extends TitleEditorInstance {}
}

export enum TitleEditorActionType {
  ToggleTitle = "toggle-title",
}

type TitleMessage = {
  payload?: undefined;
  type: TitleEditorActionType.ToggleTitle;
};

export const TitleBridge = new BridgeExtension<
  TitleEditorState,
  TitleEditorInstance,
  TitleMessage
>({
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      toggleTitle: () =>
        sendBridgeMessage({
          type: TitleEditorActionType.ToggleTitle,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canToggleTitle: editor.can().toggleTitle(),
      isTitleActive: editor.isActive("title"),
    };
  },
  onBridgeMessage: (editor, message) => {
    if (message.type === TitleEditorActionType.ToggleTitle) {
      editor.chain().focus().toggleTitle().run();
    }

    return false;
  },
  tiptapExtension: Title.configure(),
});
