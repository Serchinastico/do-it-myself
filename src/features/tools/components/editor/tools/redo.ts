import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const RedoTool: EditorTool = {
  id: "redo",
  image: () => require("@assets/icons/redo.png"),
  isActive: () => false,
  isDisabled: ({ editorState }) => !editorState.canRedo,
  onPress: ({ editor }) => editor.redo(),
};
