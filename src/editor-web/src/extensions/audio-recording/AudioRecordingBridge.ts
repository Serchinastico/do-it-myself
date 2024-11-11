import { BridgeExtension } from "@10play/tentap-editor";

import { AudioRecording, SetAudioRecordingProps } from "./audioRecording";

type AudioRecordingEditorState = object;
type AudioRecordingEditorInstance = {
  setAudioRecording: (props: SetAudioRecordingProps) => void;
};

declare module "@10play/tentap-editor" {
  interface BridgeState extends AudioRecordingEditorState {}

  interface EditorBridge extends AudioRecordingEditorInstance {}
}

export enum AudioRecordingEditorActionType {
  SetAudioRecording = "set-audio-recording",
}

export type AudioRecordingMessage = {
  payload: SetAudioRecordingProps;
  type: AudioRecordingEditorActionType.SetAudioRecording;
};

export const AudioRecordingBridge = new BridgeExtension<
  AudioRecordingEditorState,
  AudioRecordingEditorInstance,
  AudioRecordingMessage
>({
  extendCSS: `
.audio-player {
    position: relative;
    width: 250px;
    height: 88px;
    border-radius: 16px;
    display: flex;
    padding-left: 16px;
    justify-content: center;
    align-items: center;
}

.audio-player .controls {
    cursor: pointer;
}

.audio-player .hidden {
    display: none;
}

.audio-player .waveform {
    margin-left: 16px;
}

.audio-player .remaining_time {
    position: absolute;
    font-size: 14px;
    font-weight: 500;
    bottom: 6px;
    right: 8px;
}
`,
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      setAudioRecording: (props: SetAudioRecordingProps) =>
        sendBridgeMessage({
          payload: props,
          type: AudioRecordingEditorActionType.SetAudioRecording,
        }),
    };
  },
  onBridgeMessage: (editor, message) => {
    if (message.type === AudioRecordingEditorActionType.SetAudioRecording) {
      editor.chain().focus().setAudioRecording(message.payload).run();
      return true;
    }

    return false;
  },
  onEditorMessage: () => {
    return false;
  },
  tiptapExtension: AudioRecording.configure(),
});
