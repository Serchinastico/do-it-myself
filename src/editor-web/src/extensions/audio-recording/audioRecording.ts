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

export type OnAudioPauseProps = { fileName: string };
export type OnAudioPlayProps = { fileName: string; startTimeInMs: number };
export type SetAudioRecordingProps = { durationInMs: number; fileName: string };

export const AudioRecording = Node.create<AudioRecordingOptions>({
  addAttributes() {
    return { durationInMs: 0, fileName: "" };
  },

  addCommands() {
    return {
      setAudioRecording:
        (attrs: SetAudioRecordingProps) =>
        ({ chain }) => {
          return chain()
            .insertContent({ attrs, type: this.name })
            .insertContent({ type: "text" })
            .focus("end")
            .run();
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
          const durationInMs = dom.getAttribute("data-duration-in-ms");

          return { durationInMs, fileName };
        },
        tag: "audio-player",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const fileName: string = HTMLAttributes.fileName;
    const durationInMs: number = HTMLAttributes.durationInMs;

    return [
      "audio-player",
      { "data-duration-in-ms": durationInMs, "data-file-name": fileName },
    ];
  },

  selectable: false,
});
