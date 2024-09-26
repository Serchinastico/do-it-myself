import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const TitleTool: EditorTool = {
  id: "title",
  image: () => require("@assets/icons/header.png"),
  isActive: ({ editorState }) => editorState.isTitleActive,
  isDisabled: ({ editorState }) => !editorState.canToggleTitle,
  onPress: ({ editor }) => editor.toggleTitle(),
};
