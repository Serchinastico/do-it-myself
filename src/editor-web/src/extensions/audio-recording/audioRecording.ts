import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { AudioPlayer } from "./AudioPlayer";

export interface AudioRecordingOptions {
  audioRootPath: string;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    audioRecording: {
      /**
       * Loads a local image
       */
      setAudioRecording: (props: SetAudioRecordingProps) => ReturnType;
    };
  }
}

export type SetAudioRecordingProps = { fileName: string };

export const AudioRecording = Node.create<AudioRecordingOptions>({
  addAttributes() {
    return { fileName: "" };
  },

  addCommands() {
    return {
      setAudioRecording:
        (attrs: SetAudioRecordingProps) =>
        ({ commands }) => {
          return commands.insertContent({ attrs, type: this.name });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(AudioPlayer);
  },

  addOptions() {
    return {
      audioRootPath: "",
      backgroundColor: "#F90",
      HTMLAttributes: {},
    };
  },

  atom: true,
  draggable: false,
  group: "block",
  name: "audio-recording",

  parseHTML() {
    return [
      {
        getAttrs: (dom) => {
          const fileName = dom.getAttribute("data-file-name");

          return { fileName };
        },
        tag: "audio-player",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const fileName: string = HTMLAttributes.fileName;

    return ["audio-player", { "data-file-name": fileName }];
  },

  selectable: true,
});
