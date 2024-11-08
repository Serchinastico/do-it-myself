// @ts-expect-error For some reason TS can't find the useTenTap definition even though it works
import { TenTapStartKit, useTenTap } from "@10play/tentap-editor";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent } from "@tiptap/react";
import React from "react";

import {
  AudioRecordingBridge,
  DateBridge,
  LocalImageBridge,
  TitleBridge,
} from "./extensions";
import { clickHandler } from "./extensions/event/clickHandler";

declare global {
  interface Window {
    ReactNativeWebView: { postMessage: (message: string) => void };
  }
}

export const AdvancedEditor = () => {
  const editor = useTenTap({
    bridges: [
      ...TenTapStartKit,
      DateBridge(),
      TitleBridge,
      LocalImageBridge(),
      AudioRecordingBridge,
    ],
    tiptapOptions: {
      editorProps: {
        handleClick: clickHandler,
      },
      extensions: [Document, Paragraph, Text],
    },
  });
  return <EditorContent editor={editor} />;
};
