import { BridgeState, EditorBridge } from "@10play/tentap-editor";

export type ToolCallbackArgs = {
  editor: EditorBridge;
  editorState: BridgeState;
};

export interface EditorTool {
  id: string;
  image: () => any;
  isActive: (args: ToolCallbackArgs) => boolean;
  isDisabled: (args: ToolCallbackArgs) => boolean;
  onPress: (args: ToolCallbackArgs) => void;
}
