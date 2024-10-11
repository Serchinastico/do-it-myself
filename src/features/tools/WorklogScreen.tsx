import { RichText } from "@10play/tentap-editor";
import { KeyboardAvoidingView } from "@app/core/components/Keyboard";
import { EventMessage, Events } from "@app/core/event-bus/eventBus";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { formatDate } from "@app/core/utils/date";
import { useDatePressHandler } from "@app/features/tools/hooks/useDatePressHandler";
import { SafeAreaView } from "@madeja-studio/telar";
import dayjs from "dayjs";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import DatePicker from "react-native-date-picker";

import { Toolbar } from "./components/editor/Toolbar";
import { ToolHeader } from "./components/headers";
import { useRichTextEditor } from "./hooks/useRichTextEditor";

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

  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ToolHeader.Worklog onBackPress={() => navigation.goBack()} />

      <KeyboardAvoidingView>
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
      </KeyboardAvoidingView>

      <Toolbar editor={editor} project={project} />

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
    </SafeAreaView>
  );
};
