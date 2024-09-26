import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const ItalicTool: EditorTool = {
  id: "italic",
  image: () => require("@assets/icons/italic.png"),
  isActive: ({ editorState }) => editorState.isItalicActive,
  isDisabled: ({ editorState }) => !editorState.canToggleItalic,
  onPress: ({ editor }) => editor.toggleItalic(),
};
