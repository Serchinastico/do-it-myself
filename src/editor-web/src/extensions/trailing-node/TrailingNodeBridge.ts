import { BridgeExtension } from "@10play/tentap-editor";

import { TrailingNode } from "./trailing-node";

type TrailingNodeEditorInstance = {};
type TrailingNodeEditorState = {};

declare module "@10play/tentap-editor" {
  interface BridgeState extends TrailingNodeEditorState {}

  interface EditorBridge extends TrailingNodeEditorInstance {}
}

type TrailingNodeMessage = {};

export const TrailingNodeBridge = new BridgeExtension<
  TrailingNodeEditorState,
  TrailingNodeEditorInstance,
  TrailingNodeMessage
>({
  tiptapExtension: TrailingNode.configure(),
});
