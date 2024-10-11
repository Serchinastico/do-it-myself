import { BridgeExtension } from "@10play/tentap-editor";

import { Date, ToggleDateProps } from "./date";

type DateEditorState = {
  canToggleDate: boolean;
  isDateActive: boolean;
};
type DateEditorInstance = {
  toggleDate: (props: ToggleDateProps) => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends DateEditorState {}

  interface EditorBridge extends DateEditorInstance {}
}

export enum DateEditorActionType {
  ToggleDate = "toggle-date",
}

type DateMessage = {
  payload: ToggleDateProps;
  type: DateEditorActionType.ToggleDate;
};

export const DateBridge = new BridgeExtension<
  DateEditorState,
  DateEditorInstance,
  DateMessage
>({
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      toggleDate: (props: ToggleDateProps) =>
        sendBridgeMessage({
          payload: props,
          type: DateEditorActionType.ToggleDate,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canToggleDate: editor.can().toggleDate({ backgroundColor: "#000" }),
      isDateActive: editor.isActive("date"),
    };
  },
  onBridgeMessage: (editor, message) => {
    if (message.type === DateEditorActionType.ToggleDate) {
      editor.chain().focus().toggleDate(message.payload).run();
    }

    return false;
  },
  tiptapExtension: Date.configure(),
});
