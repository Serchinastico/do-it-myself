import { EditorBridge, useBridgeState } from "@10play/tentap-editor";
import { color } from "@app/core/theme/color";
import { Project } from "@app/domain/project";
import { TOOLBAR_TOOLS } from "@app/features/tools/components/editor/tools";
import { Button, Center, useKeyboard } from "@madeja-studio/telar";
import chroma from "chroma-js";
import { FlatList, Image, KeyboardAvoidingView, Platform } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";

interface Props {
  editor: EditorBridge;
  project: Project;
}

export const Toolbar = ({ editor, project }: Props) => {
  const editorState = useBridgeState(editor);
  const { isKeyboardUp } = useKeyboard();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw.style(`absolute bottom-0 w-100 bg-white`)}
    >
      <FlatList
        contentContainerStyle={[
          tw`center border-t bg-white`,
          { borderColor: chroma(color.black).alpha(0.1).hex() },
        ]}
        data={TOOLBAR_TOOLS}
        horizontal
        renderItem={({ item }) => (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button.Container
                hasHapticFeedback
                isDisabled={item.isDisabled({ editor, editorState, project })}
                onPress={() => {
                  if (item.hasMenu) return;

                  item.onPress({ editor, editorState, project });
                }}
              >
                <Center
                  style={tw.style(`h-[32px] w-[32px] mx-2 rounded-1`, {
                    "bg-primary": item.isActive({
                      editor,
                      editorState,
                      project,
                    }),
                  })}
                >
                  <Image
                    resizeMode="contain"
                    source={item.image()}
                    style={tw.style(`h-[20px] w-[20px]`, {
                      tintColor: item.isActive({ editor, editorState, project })
                        ? color.white
                        : item.isDisabled({
                              editor,
                              editorState,
                              project,
                            })
                          ? chroma(color.secondary).alpha(0.3).hex()
                          : color.secondary,
                    })}
                  />
                </Center>
              </Button.Container>
            </DropdownMenu.Trigger>

            {item.hasMenu ? (
              // @ts-ignore
              <DropdownMenu.Content>
                {item.menuOptions.map(({ key, onPress, text }) => (
                  <DropdownMenu.Item
                    key={key}
                    onSelect={async () => {
                      await onPress({ editor, editorState, project });
                    }}
                  >
                    <DropdownMenu.ItemTitle>{text}</DropdownMenu.ItemTitle>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            ) : null}
          </DropdownMenu.Root>
        )}
        showsHorizontalScrollIndicator={false}
        style={tw.style({ hidden: !isKeyboardUp }, `min-h-press`)}
      />
    </KeyboardAvoidingView>
  );
};
