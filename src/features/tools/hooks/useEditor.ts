import { useEditorBridge, useEditorContent } from "@10play/tentap-editor";
import { TenTapStartKit } from "@10play/tentap-editor/src/bridges/StarterKit";
import { color } from "@app/core/theme/color";
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
      ...TenTapStartKit,
      TitleBridge.configureExtension({
        backgroundColor: getProjectColorById(project.colorId).hex,
      }),
    ],
    customSource: editorHtml,
    dynamicHeight: true,
    editable: isEditing,
    initialContent: getToolHtml({ project, toolType: "manual" })!,
    theme: {
      toolbar: {
        icon: { height: 20, tintColor: color.secondary, width: 20 },
        iconActive: { tintColor: color.white },
        iconWrapper: {
          alignItems: "center",
          height: 32,
          justifyContent: "center",
          width: 32,
        },
        iconWrapperActive: {
          backgroundColor: color.primary,
        },
        toolbarBody: {
          backgroundColor: color.white,
          height: 48,
        },
      },
    },
  });
  const html = useEditorContent(editor, { type: "html" });

  return { editor, html };
};
