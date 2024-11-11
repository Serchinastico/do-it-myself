import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const UnderlineTool: EditorTool = {
  id: "underline",
  image: () => require("@assets/icons/underline.png"),
  isActive: ({ editorState }) => editorState.isUnderlineActive,
  isDisabled: ({ editorState }) => !editorState.canToggleUnderline,
  onPress: ({ editor }) => editor.toggleUnderline(),
  tag: "icon",
};
