import {
  TenTapStartKit,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";
import eventBus, { EventMessage } from "@app/core/event-bus/eventBus";
import { RootNavigation } from "@app/core/navigation/routes";
import {
  Project,
  ToolType,
  getProjectColorById,
  getToolHtml,
} from "@app/domain/project";
import { editorHtml as manualEditorHtml } from "@app/editor-web/build-manual/editorHtml";
import {
  editorHtml,
  editorHtml as worklogEditorHtml,
} from "@app/editor-web/build-worklog/editorHtml";
import { LocalImageBridge, TitleBridge } from "editor-web/src/extensions";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";

import { useLocalImagePressHandler } from "./useLocalImagePressHandler";

interface Props {
  isEditing: boolean;
  navigation: Pick<RootNavigation, "navigate">;
  project: Project;
  toolType: ToolType;
}

export type JsonDocument =
  | {
      content: { attrs: Record<string, any>; type: string }[];
      type: "doc";
    }
  | undefined;

export type HtmlFileStatus = "not-ready" | "ready" | "writing";

const getHtmlPath = (toolType: ToolType) =>
  `${FileSystem.documentDirectory}${toolType}.index.html`;

/**
 * Custom hook to manage the state and operations of an editor instance.
 *
 * @param isEditing Pass true to enable editing mode, false to view mode.
 * @param navigation React Navigation object to manage navigation within the hook (e.g. open image).
 * @param project Object containing project details, including colorId.
 * @param toolType Type of tool being used, which modifies the editor's behavior and content.
 *
 * @returns An object containing:
 * - editor: Editor instance with configurations and extensions.
 * - html: HTML content of the editor.
 *
 * This hook sets up the editor with the specified configuration, initializes the HTML file status,
 * and handles saving HTML content to disk. Additionally, it manages the editor content in both HTML
 * and JSON formats, and sets up a local image press handler when in editing mode.
 *
 * Example usage:
 *
 * const { editor, html } = useEditor({
 *   isEditing: true,
 *   navigation: yourNavigationObject,
 *   project: { colorId: 1 },
 *   toolType: "manual"
 * });
 */
export const useEditor = ({
  isEditing,
  navigation,
  project,
  toolType,
}: Props) => {
  const htmlPath = getHtmlPath(toolType);
  const [htmlFileStatus, setHtmlFileStatus] =
    useState<HtmlFileStatus>("not-ready");

  const saveHtmlFileToDisk = useCallback(
    (html: string) => FileSystem.writeAsStringAsync(htmlPath, html),
    [htmlPath]
  );

  useEffect(() => {
    if (htmlFileStatus !== "not-ready") return;

    setHtmlFileStatus("writing");
    saveHtmlFileToDisk(editorHtml).then(() => setHtmlFileStatus("ready"));
  }, [htmlFileStatus]);

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

  useLocalImagePressHandler({
    isEditing,
    json: json as JsonDocument,
    navigation,
  });

  return { editor, html, htmlPath };
};
