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
import { KeyboardAvoidingView, Platform } from "react-native";

import { ToolHeader } from "./components/headers";

/**
 * I'm including here an extract of editor.getJSON()
 *
 * {
 *   "type": "doc",
 *   "content": [
 *     {
 *       "type": "heading",
 *       "attrs": {
 *         "level": 1
 *       },
 *       "content": [
 *         {
 *           "type": "text",
 *           "text": "# Start editing!"
 *         }
 *       ]
 *     },
 *     {
 *       "type": "paragraph",
 *       "content": [
 *         {
 *           "type": "text",
 *           "text": "Kdkdks"
 *         }
 *       ]
 *     },
 *     {
 *       "type": "paragraph",
 *       "content": [
 *         {
 *           "type": "text",
 *           "text": "Kdkdks Huey’"
 *         },
 *         {
 *           "type": "text",
 *           "marks": [
 *             {
 *               "type": "bold"
 *             }
 *           ],
 *           "text": "s dbdhsj"
 *         },
 *         {
 *           "type": "text",
 *           "text": " jdjdj"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */

export const ManualScreen = ({ navigation }: RootScreenProps<"manual">) => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    bridgeExtensions: [...TenTapStartKit, ImmutableSectionBridge],
    customSource: editorHtml,
    dynamicHeight: true,
    // avoidIosKeyboard: true,
    initialContent:
      "<h1>Start editing!</h1><p>iashdiu ahdisua hudsai</p><immutable-section>Variables</immutable-section><p>aisuhd uasg duysa g</p>",
  });

  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ToolHeader.Manual
        onBackPress={() => navigation.goBack()}
        onEditPress={() => {}}
        onExportPress={() => {}}
      />

      <RichText containerStyle={tw`px-4`} editor={editor} scrollEnabled />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          bottom: 0,
          position: "absolute",
          width: "100%",
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
