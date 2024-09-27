import { ToolbarContext } from "@10play/tentap-editor/src/RichText/Toolbar/Toolbar";
import { EditorTool } from "@app/features/tools/components/editor/tools/base";
import { Platform } from "react-native";

export const LinkTool: EditorTool = {
  id: "link",
  image: () => require("@assets/icons/link.png"),
  isActive: ({ editorState }) => editorState.isLinkActive,
  isDisabled: ({ editorState }) =>
    !editorState.isLinkActive && !editorState.canSetLink,
  // TODO Get link
  onPress:
    ({ editor, editorState, setToolbarContext }) =>
    () => {
      if (Platform.OS === "android") {
        // On android focus outside the editor will lose the tiptap selection so we wait for the next tick and set it with the last selection value we had
        setTimeout(() => {
          editor.setSelection(
            editorState.selection.from,
            editorState.selection.to
          );
        });
      }
      setToolbarContext(ToolbarContext.Link);
    },
};
