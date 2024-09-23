import { CoreBridge, useTenTap } from "@10play/tentap-editor";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent } from "@tiptap/react";
import React from "react";

import { ImmutableSectionBridge } from "./ImmutableSectionBridge";

export const AdvancedEditor = () => {
  const editor = useTenTap({
    bridges: [CoreBridge, ImmutableSectionBridge],
    tiptapOptions: {
      extensions: [Document, Paragraph, Text],
    },
  });
  return <EditorContent editor={editor} />;
};
