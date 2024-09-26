import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const BoldTool: EditorTool = {
  id: "bold",
  image: () => require("@assets/icons/bold.png"),
  isActive: ({ editorState }) => editorState.isBoldActive,
  isDisabled: ({ editorState }) => !editorState.canToggleBold,
  onPress: ({ editor }) => editor.toggleBold(),
};
