import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const LinkTool: EditorTool = {
  id: "link",
  image: () => require("@assets/icons/link.png"),
  isActive: ({ editorState }) => editorState.isLinkActive,
  isDisabled: ({ editorState }) => !editorState.canSetLink,
  // TODO Get link
  onPress: ({ editor }) => editor.setLink(null),
};
