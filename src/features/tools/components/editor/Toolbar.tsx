import { EditorBridge, useBridgeState } from "@10play/tentap-editor";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { color } from "@app/core/theme/color";
import { Project } from "@app/domain/project";
import { EditorTool } from "@app/features/tools/components/editor/tools/base";
import { Button, Center, useKeyboard } from "@madeja-studio/telar";
import chroma from "chroma-js";
import { FlatList, Image, KeyboardAvoidingView, Platform } from "react-native";
import * as DropdownMenu from "zeego/dropdown-menu";

interface Props {
  editor: EditorBridge;
  project: Project;
  tools: EditorTool[];
}

export const Toolbar = ({ editor, project, tools }: Props) => {
  const editorState = useBridgeState(editor);
  const { isKeyboardUp } = useKeyboard();
  const colorSwitch = useColorSwitch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw.style(`absolute bottom-0 w-100 bg-white dark:bg-ash`)}
    >
      <FlatList
        contentContainerStyle={[
          tw`center border-t bg-white dark:bg-ash`,
          { borderColor: chroma(color.black).alpha(0.1).hex() },
        ]}
        data={tools}
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
                          ? chroma(
                              colorSwitch({ dark: "white", light: "ash" })!
                            )
                              .alpha(0.3)
                              .hex()
                          : colorSwitch({ dark: "white", light: "ash" }),
                    })}
                  />
                </Center>
              </Button.Container>
            </DropdownMenu.Trigger>

            {item.hasMenu ? (
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
