import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const UndoTool: EditorTool = {
  id: "undo",
  image: () => require("@assets/icons/undo.png"),
  isActive: () => false,
  isDisabled: ({ editorState }) => !editorState.canUndo,
  onPress: ({ editor }) => editor.undo(),
};
