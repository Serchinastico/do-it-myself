import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const FormulaTool: EditorTool = {
  id: "formula",
  image: () => require("@assets/icons/equation.png"),
  isActive: ({ editorState }) => editorState.isBulletListActive,
  isDisabled: ({ editorState }) => !editorState.canToggleBulletList,
  onPress: ({ editor }) => editor.toggleBulletList(),
};
