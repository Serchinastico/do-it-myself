// @ts-ignore For some reason TS can't find the useTenTap definition even though it works
import { TenTapStartKit, useTenTap } from "@10play/tentap-editor";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent } from "@tiptap/react";
import React from "react";

import { TitleBridge } from "./extensions/TitleBridge";

export const AdvancedEditor = () => {
  const editor = useTenTap({
    bridges: [...TenTapStartKit, TitleBridge],
    tiptapOptions: {
      extensions: [Document, Paragraph, Text],
    },
  });
  return <EditorContent editor={editor} />;
};
