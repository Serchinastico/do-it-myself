import { useEditorBridge, useEditorContent } from "@10play/tentap-editor";
import { TenTapStartKit } from "@10play/tentap-editor/src/bridges/StarterKit";
import { Project, getProjectColorById, getToolHtml } from "@app/domain/project";
import { editorHtml } from "@app/editor-web/build/editorHtml";
import { TitleBridge } from "@app/editor-web/extensions/TitleBridge";

interface Props {
  isEditing: boolean;
  project: Project;
}

export const useEditor = ({ isEditing, project }: Props) => {
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
    ],
    customSource: editorHtml,
    dynamicHeight: true,
    editable: isEditing,
    initialContent: getToolHtml({ project, toolType: "manual" })!,
  });
  const html = useEditorContent(editor, { type: "html" });

  return { editor, html };
};
