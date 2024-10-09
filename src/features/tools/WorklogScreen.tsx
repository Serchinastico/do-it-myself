import { RichText } from "@10play/tentap-editor";
import { EventMessage } from "@app/core/event-bus/eventBus";
import useEventBus from "@app/core/event-bus/useEventBus";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { editorHtml } from "@app/editor-web/build/editorHtml";
import { SafeAreaView } from "@madeja-studio/telar";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import invariant from "tiny-invariant";

import { Toolbar } from "./components/editor/Toolbar";
import { ToolHeader } from "./components/headers";
import { useEditor } from "./hooks/useEditor";

const HTML_PATH = `${FileSystem.documentDirectory}index.html`;

type HtmlFileStatus = "not-ready" | "ready" | "writing";

export const WorklogScreen = ({
  navigation,
  route,
}: RootScreenProps<"worklog">) => {
  const [isEditing, setIsEditing] = useState(false);
  const [htmlFileStatus, setHtmlFileStatus] =
    useState<HtmlFileStatus>("not-ready");
  const { projectId } = route.params;
  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );

  const { editor, html, json } = useEditor({
    isEditing,
    project,
  });

  const saveHtmlFileToDisk = useCallback(async (html: string) => {
    await FileSystem.writeAsStringAsync(HTML_PATH, html);
  }, []);

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

    setProject({ manual: { html } });
  }, [html]);

  useEffect(() => {
    if (htmlFileStatus !== "not-ready") return;

    setHtmlFileStatus("writing");
    saveHtmlFileToDisk(editorHtml).then(() => setHtmlFileStatus("ready"));
  }, [htmlFileStatus]);

  useEventBus(
    EventMessage.LocalImagePress,
    ({ fileName, groupId }) => {
      if (isEditing) return;

      const node = json?.content.find(
        (node) =>
          node.type === "local-image" && node.attrs["groupId"] === groupId
      );

      invariant(node);

      const images = node.attrs["images"] as { fileName: string }[];
      const imagePaths = images.map(({ fileName }) => fileName);
      const initialImageIndex = imagePaths.indexOf(fileName);

      navigation.navigate("imageViewer", {
        imagePaths,
        initialImageIndex,
      });
    },
    [json, isEditing]
  );

  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ToolHeader.Manual
        isEditing={isEditing}
        onBackPress={() => navigation.goBack()}
        onEditPress={onEditPress}
        onExportPress={() => {}}
      />

      <RichText
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        allowingReadAccessToURL={`${FileSystem.documentDirectory}`}
        containerStyle={tw`px-4 pt-4`}
        editor={editor}
        focusable={isEditing}
        originWhitelist={["*"]}
        source={{ uri: HTML_PATH }}
      />

      <Toolbar editor={editor} project={project} />
    </SafeAreaView>
  );
};
