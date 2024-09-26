import { EditorTool } from "@app/features/tools/components/editor/tools/base";

export const ImageTool: EditorTool = {
  id: "image",
  image: () => require("@assets/icons/image.png"),
  isActive: () => false,
  isDisabled: () => false,
  // TODO Get image link
  onPress: ({ editor }) => editor.setImage(""),
};
