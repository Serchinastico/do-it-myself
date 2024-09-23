import { BridgeExtension } from "@10play/tentap-editor";

import { ImmutableSection } from "./immutableSection";

type ImmutableSectionEditorState = object;

type ImmutableSectionEditorInstance = object;

declare module "@10play/tentap-editor" {
  interface BridgeState extends ImmutableSectionEditorState {}

  interface EditorBridge extends ImmutableSectionEditorInstance {}
}

export const ImmutableSectionBridge = new BridgeExtension<
  ImmutableSectionEditorState,
  ImmutableSectionEditorInstance,
  unknown
>({
  extendEditorState: (editor) => {
    return {};
  },
  tiptapExtension: ImmutableSection.configure(),
});
