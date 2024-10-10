import { RichText } from "@10play/tentap-editor";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { SafeAreaView } from "@madeja-studio/telar";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect } from "react";

import { Toolbar } from "./components/editor/Toolbar";
import { ToolHeader } from "./components/headers";
import { useEditor } from "./hooks/useEditor";

export const WorklogScreen = ({
  navigation,
  route,
}: RootScreenProps<"worklog">) => {
  const { projectId } = route.params;

  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );

  const { editor, html, htmlPath } = useEditor({
    isEditing: true,
    navigation,
    project,
    toolType: "worklog",
  });

  useEffect(() => {
    if (!html) return;

    setProject({ worklog: { html } });
  }, [html]);

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
        source={{ uri: htmlPath }}
      />

      <Toolbar editor={editor} project={project} />
    </SafeAreaView>
  );
};
