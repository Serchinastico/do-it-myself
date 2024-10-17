import { RichText } from "@10play/tentap-editor";
import { SafeArea } from "@app/core/components/SafeArea";
import { EventMessage, Events } from "@app/core/event-bus/eventBus";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { formatDate } from "@app/core/utils/date";
import { WORKLOG_TOOLBAR } from "@app/features/tools/components/editor/tools";
import { useDatePressHandler } from "@app/features/tools/hooks/useDatePressHandler";
import dayjs from "dayjs";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";

import { Toolbar } from "../components/editor/Toolbar";
import { ToolHeader } from "../components/headers";
import { useRichTextEditor } from "../hooks/useRichTextEditor";

export const WorklogScreen = ({
  navigation,
  route,
}: RootScreenProps<"worklog">) => {
  const { projectId } = route.params;

  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );

  const [selectedDate, setSelectedDate] = useState<
    Events[typeof EventMessage.DatePress] | undefined
  >(undefined);
  const [hasOpenedKeyboard, setHasOpenedKeyboard] = useState(false);

  const { editor, html, htmlPath, json } = useRichTextEditor({
    isEditing: true,
    navigation,
    project,
    toolType: "worklog",
  });

  useDatePressHandler({ json, onPress: setSelectedDate });

  useEffect(() => {
    if (!html) return;

    setProject({ worklog: { contentHtml: html } });
  }, [html]);

  useEffect(() => {
    if (hasOpenedKeyboard) return;
    if (!editor.getEditorState().isReady) return;

    editor.focus("end");
    setHasOpenedKeyboard(true);
  }, [editor, hasOpenedKeyboard]);

  return (
    <SafeArea>
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

      <Toolbar editor={editor} project={project} tools={WORKLOG_TOOLBAR} />

      <DatePicker
        date={selectedDate ? dayjs(selectedDate.date).toDate() : new Date()}
        maximumDate={new Date()}
        modal
        mode="date"
        onCancel={() => {
          setSelectedDate(undefined);
        }}
        onConfirm={(date) => {
          editor.setDate({
            date: dayjs(date).toISOString(),
            id: selectedDate!.id,
            text: formatDate(date),
          });
          setSelectedDate(undefined);
        }}
        open={selectedDate !== undefined}
      />
    </SafeArea>
  );
};