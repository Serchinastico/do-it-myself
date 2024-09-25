import {
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
} from "@10play/tentap-editor";
import { RootScreenProps } from "@app/core/navigation/routes";
import { color } from "@app/core/theme/color";
import { ImmutableSectionBridge } from "@app/editor-web/ImmutableSectionBridge";
import { editorHtml } from "@app/editor-web/build/editorHtml";
import { SafeAreaView } from "@madeja-studio/telar";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { ToolHeader } from "./components/headers";

export const ManualScreen = ({ navigation }: RootScreenProps<"manual">) => {
  const [isEditing, setIsEditing] = useState(false);

  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    bridgeExtensions: [...TenTapStartKit, ImmutableSectionBridge],
    customSource: editorHtml,
    dynamicHeight: true,
    editable: isEditing,
    initialContent:
      "<h1>Start editing!</h1><p>iashdiu ahdisua hudsai</p><immutable-section>Variables</immutable-section><p>aisuhd uasg duysa g</p>",
    theme: {
      toolbar: {
        icon: { height: 20, tintColor: color.secondary, width: 20 },
        toolbarBody: {
          backgroundColor: color.white,
          height: 48,
        },
      },
    },
  });

  useEffect(() => {
    if (isEditing) {
      editor.focus("end");
    }
  }, [isEditing]);

  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ToolHeader.Manual
        isEditing={isEditing}
        onBackPress={() => navigation.goBack()}
        onEditPress={() => setIsEditing((isEditing) => !isEditing)}
        onExportPress={() => {}}
      />

      <RichText
        containerStyle={tw`px-4`}
        editor={editor}
        focusable={isEditing}
        scrollEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          bottom: 0,
          position: "absolute",
          width: "100%",
        }}
      >
        <Toolbar
          editor={editor}
          items={[
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/header.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/list.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/equation.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/bold.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/italic.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/underline.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/link.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/image.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/mic.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/undo.png"),
              onPress: () => () => {},
            },
            {
              active: () => false,
              disabled: () => false,
              image: () => require("@assets/icons/redo.png"),
              onPress: () => () => {},
            },
          ]}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
