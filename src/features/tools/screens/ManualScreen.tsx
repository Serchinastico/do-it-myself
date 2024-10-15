import { RichText } from "@10play/tentap-editor";
import { KeyboardAvoidingView } from "@app/core/components/Keyboard";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { MANUAL_TOOLBAR } from "@app/features/tools/components/editor/tools";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { Toolbar } from "../components/editor/Toolbar";
import { ToolHeader } from "../components/headers";
import { useRichTextEditor } from "../hooks/useRichTextEditor";

export const ManualScreen = ({
  navigation,
  route,
}: RootScreenProps<"manual">) => {
  const { projectId } = route.params;

  const [isEditing, setIsEditing] = useState(false);
  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );

  const { editor, html, htmlPath } = useRichTextEditor({
    isEditing,
    navigation,
    project,
    toolType: "manual",
  });

  const onEditPress = useCallback(() => {
    setIsEditing((isEditing) => !isEditing);

    /**
     * Keep in mind that here isEditing is reversed as it happens before we do
     * the switch
     */
    if (!isEditing) {
      editor.focus("end");
    } else {
      editor.blur();
    }
  }, [editor, isEditing]);

  useEffect(() => {
    if (!html) return;

    setProject({ manual: { contentHtml: html } });
  }, [html]);

  return (
    <SafeArea>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ToolHeader.Manual
        isEditing={isEditing}
        onBackPress={() => navigation.goBack()}
        onEditPress={onEditPress}
        onExportPress={() => {}}
      />

      <KeyboardAvoidingView>
        <RichText
          allowFileAccess
          allowFileAccessFromFileURLs
          allowUniversalAccessFromFileURLs
          allowingReadAccessToURL={`${FileSystem.documentDirectory}`}
          containerStyle={tw`px-4 pt-4`}
          editor={editor}
          focusable={isEditing}
          originWhitelist={["*"]}
          source={{ uri: htmlPath }}
        />
      </KeyboardAvoidingView>

      <Toolbar editor={editor} project={project} tools={MANUAL_TOOLBAR} />
    </SafeArea>
  );
};
