import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const AudioTool: EditorTool = {
  id: "audio",
  image: () => require("@assets/icons/mic.png"),
  isActive: () => false,
  isDisabled: () => false,
  // TODO Set audio
  onPress: ({ editor }) => editor.toggleUnderline(),
};
