import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const ListTool: EditorTool = {
  id: "list",
  image: () => require("@assets/icons/list.png"),
  isActive: ({ editorState }) => editorState.isBulletListActive,
  isDisabled: ({ editorState }) => !editorState.canToggleBulletList,
  onPress: ({ editor }) => editor.toggleBulletList(),
  tag: "icon",
};
