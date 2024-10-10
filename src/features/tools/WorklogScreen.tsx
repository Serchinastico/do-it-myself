import { RichText } from "@10play/tentap-editor";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { editorHtml } from "@app/editor-web/build-worklog/editorHtml";
import { useLocalImagePressHandler } from "@app/features/tools/hooks/useLocalImagePressHandler";
import { SafeAreaView } from "@madeja-studio/telar";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";

import { Toolbar } from "./components/editor/Toolbar";
import { ToolHeader } from "./components/headers";
import { useEditor } from "./hooks/useEditor";

const HTML_PATH = `${FileSystem.documentDirectory}worklog-index.html`;

type HtmlFileStatus = "not-ready" | "ready" | "writing";

export const WorklogScreen = ({
  navigation,
  route,
}: RootScreenProps<"worklog">) => {
  const [htmlFileStatus, setHtmlFileStatus] =
    useState<HtmlFileStatus>("not-ready");
  const { projectId } = route.params;
  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );

  const { editor, html, json } = useEditor({
    isEditing: true,
    project,
    toolType: "worklog",
  });

  const saveHtmlFileToDisk = useCallback(async (html: string) => {
    await FileSystem.writeAsStringAsync(HTML_PATH, html);
  }, []);

  useEffect(() => {
    if (!html) return;

    setProject({ worklog: { html } });
  }, [html]);

  useEffect(() => {
    if (htmlFileStatus !== "not-ready") return;

    setHtmlFileStatus("writing");
    saveHtmlFileToDisk(editorHtml).then(() => setHtmlFileStatus("ready"));
  }, [htmlFileStatus]);

  useLocalImagePressHandler({ json, navigation });

  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ToolHeader.Worklog onBackPress={() => navigation.goBack()} />

      <RichText
        allowFileAccess
        allowFileAccessFromFileURLs
        allowUniversalAccessFromFileURLs
        allowingReadAccessToURL={`${FileSystem.documentDirectory}`}
        containerStyle={tw`px-4 pt-4`}
        editor={editor}
        focusable
        originWhitelist={["*"]}
        source={{ uri: HTML_PATH }}
      />

      <Toolbar editor={editor} project={project} />
    </SafeAreaView>
  );
};
