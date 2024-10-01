import { getProjectColorById } from "@app/domain/project";
import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const TitleTool: EditorTool = {
  id: "title",
  image: () => require("@assets/icons/header.png"),
  isActive: ({ editorState }) => editorState.isTitleActive,
  isDisabled: ({ editorState }) => !editorState.canToggleTitle,
  onPress: ({ editor, project }) =>
    editor.toggleTitle({
      backgroundColor: getProjectColorById(project.colorId).hex,
    }),
};
