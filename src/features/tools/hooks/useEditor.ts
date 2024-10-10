import {
  TenTapStartKit,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";
import eventBus, { EventMessage } from "@app/core/event-bus/eventBus";
import {
  Project,
  ToolType,
  getProjectColorById,
  getToolHtml,
} from "@app/domain/project";
import { editorHtml as manualEditorHtml } from "@app/editor-web/build-manual/editorHtml";
import { editorHtml as worklogEditorHtml } from "@app/editor-web/build-worklog/editorHtml";
import { LocalImageBridge, TitleBridge } from "editor-web/src/extensions";
import * as FileSystem from "expo-file-system";

interface Props {
  isEditing: boolean;
  project: Project;
  toolType: ToolType;
}

export type JsonDocument =
  | {
      content: { attrs: Record<string, any>; type: string }[];
      type: "doc";
    }
  | undefined;

export const useEditor = ({ isEditing, project, toolType }: Props) => {
  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    bridgeExtensions: [
      ...TenTapStartKit,
      TitleBridge.configureExtension({
        backgroundColor: getProjectColorById(project.colorId).hex,
      }),
      LocalImageBridge((props) => {
        eventBus.emit(EventMessage.LocalImagePress, props);
      }).configureExtension({
        imagesRootPath: `${FileSystem.documentDirectory}`,
      }),
    ],
    customSource: toolType === "manual" ? manualEditorHtml : worklogEditorHtml,
    dynamicHeight: true,
    editable: isEditing,
    initialContent: getToolHtml({ project, toolType })!,
  });
  const html = useEditorContent(editor, { type: "html" });
  const json = useEditorContent(editor, { type: "json" });

  return { editor, html, json: json as JsonDocument };
};
