import { BridgeExtension } from "@10play/tentap-editor";

import { CreateDateProps, Date, OnDateClickProps, SetDateProps } from "./date";

type DateEditorState = object;
type DateEditorInstance = {
  createDate: (props: CreateDateProps) => void;
  setDate: (props: SetDateProps) => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends DateEditorState {}

  interface EditorBridge extends DateEditorInstance {}
}

export enum DateEditorActionType {
  Click = "date-click",
  CreateDate = "create-date",
  SetDate = "set-date",
}

type DateMessage =
  | {
      payload: CreateDateProps;
      type: DateEditorActionType.CreateDate;
    }
  | {
      payload: OnDateClickProps;
      type: DateEditorActionType.Click;
    }
  | {
      payload: SetDateProps;
      type: DateEditorActionType.SetDate;
    };

export const DateBridge = (
  onClick?: (props: OnDateClickProps) => Promise<void> | void
) =>
  new BridgeExtension<DateEditorState, DateEditorInstance, DateMessage>({
    extendEditorInstance: (sendBridgeMessage) => {
      return {
        createDate: (props: CreateDateProps) =>
          sendBridgeMessage({
            payload: props,
            type: DateEditorActionType.CreateDate,
          }),
        setDate: (props: SetDateProps) =>
          sendBridgeMessage({
            payload: props,
            type: DateEditorActionType.SetDate,
          }),
      };
    },
    onBridgeMessage: (editor, message) => {
      if (message.type === DateEditorActionType.CreateDate) {
        editor.chain().focus().createDate(message.payload).run();
      }

      if (message.type === DateEditorActionType.SetDate) {
        editor.chain().focus().setDate(message.payload).run();
      }

      return false;
    },
    onEditorMessage: (message) => {
      if (message.type === DateEditorActionType.Click) {
        if (onClick) {
          onClick(message.payload);
        }

        return true;
      }

      return false;
    },
    tiptapExtension: Date.configure(),
  });
