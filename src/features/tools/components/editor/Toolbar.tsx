import { EditorBridge, useBridgeState } from "@10play/tentap-editor";
import { color } from "@app/core/theme/color";
import { TOOLBAR_TOOLS } from "@app/features/tools/components/editor/tools";
import { Button, Center, useKeyboard } from "@madeja-studio/telar";
import chroma from "chroma-js";
import { FlatList, Image } from "react-native";

interface Props {
  editor: EditorBridge;
}

export const Toolbar = ({ editor }: Props) => {
  const editorState = useBridgeState(editor);
  const { isKeyboardUp } = useKeyboard();

  return (
    <FlatList
      contentContainerStyle={[
        tw`center border-t`,
        { borderColor: chroma(color.black).alpha(0.1).hex() },
      ]}
      data={TOOLBAR_TOOLS}
      horizontal
      renderItem={({ item }) => (
        <Button.Container
          hasHapticFeedback
          isDisabled={item.isDisabled({ editor, editorState })}
          onPress={() => item.onPress({ editor, editorState })}
        >
          <Center
            style={tw.style(`h-[32px] w-[32px] mx-2 rounded-1`, {
              "bg-primary": item.isActive({ editor, editorState }),
            })}
          >
            <Image
              resizeMode="contain"
              source={item.image()}
              style={tw.style(`h-[20px] w-[20px]`, {
                tintColor: item.isActive({ editor, editorState })
                  ? color.white
                  : color.secondary,
              })}
            />
          </Center>
        </Button.Container>
      )}
      showsHorizontalScrollIndicator={false}
      style={tw.style({ hidden: !isKeyboardUp }, `min-h-press`)}
    />
  );
};
