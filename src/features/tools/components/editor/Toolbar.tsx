import { EditorBridge, Toolbar as TenTapToolbar } from "@10play/tentap-editor";
import { TOOLBAR_TOOLS } from "@app/features/tools/components/editor/tools";

interface Props {
  editor: EditorBridge;
}

export const Toolbar = ({ editor }: Props) => {
  return (
    <TenTapToolbar
      editor={editor}
      items={TOOLBAR_TOOLS.map((tool) => ({
        active: tool.isActive,
        disabled: tool.isDisabled,
        image: tool.image,
        onPress: (args) => () => tool.onPress(args),
      }))}
    />
  );
};
