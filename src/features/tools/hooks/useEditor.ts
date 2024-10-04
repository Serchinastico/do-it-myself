import {
  TenTapStartKit,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";
import { Project, getProjectColorById, getToolHtml } from "@app/domain/project";
import { editorHtml } from "@app/editor-web/build/editorHtml";
import { LocalImageBridge, TitleBridge } from "@app/editor-web/extensions";
import * as FileSystem from "expo-file-system";

interface Props {
  isEditing: boolean;
  onImageClick: (fileName: string) => Promise<void> | void;
  project: Project;
}

export const useEditor = ({ isEditing, onImageClick, project }: Props) => {
  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    bridgeExtensions: [
      // @ts-ignore
      ...TenTapStartKit,
      // @ts-ignore
      TitleBridge.configureExtension({
        backgroundColor: getProjectColorById(project.colorId).hex,
      }),
      // @ts-ignore
      LocalImageBridge(onImageClick).configureExtension({
        imagesRootPath: `${FileSystem.documentDirectory}`,
      }),
    ],
    customSource: editorHtml,
    dynamicHeight: true,
    editable: isEditing,
    initialContent: getToolHtml({ project, toolType: "manual" })!,
  });
  const html = useEditorContent(editor, { type: "html" });
  const json = useEditorContent(editor, { type: "json" });

  return { editor, html, json };
};
