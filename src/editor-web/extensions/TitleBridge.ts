import { BridgeExtension } from "@10play/tentap-editor";

import { Title } from "./title";

type TitleEditorState = object;
type TitleEditorInstance = object;

declare module "@10play/tentap-editor" {
  interface BridgeState extends TitleEditorState {}

  interface EditorBridge extends TitleEditorInstance {}
}

export const TitleBridge = new BridgeExtension<
  TitleEditorState,
  TitleEditorInstance,
  unknown
>({
  extendEditorState: (editor) => {
    return {};
  },
  tiptapExtension: Title.configure(),
});
