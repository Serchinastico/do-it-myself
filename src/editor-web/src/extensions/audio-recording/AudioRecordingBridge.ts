import { BridgeExtension } from "@10play/tentap-editor";

import {
  AudioRecording,
  OnAudioPauseProps,
  OnAudioPlayProps,
  SetAudioRecordingProps,
} from "./audioRecording";
import { audioRecordingStyle } from "./style";

type AudioRecordingEditorInstance = {
  setAudioRecording: (props: SetAudioRecordingProps) => void;
};

type AudioRecordingEditorState = object;

declare module "@10play/tentap-editor" {
  interface BridgeState extends AudioRecordingEditorState {}

  interface EditorBridge extends AudioRecordingEditorInstance {}
}

export enum AudioRecordingEditorActionType {
  PauseAudio = "pause-audio",
  PlayAudio = "play-audio",
  SetAudioRecording = "set-audio-recording",
}

export type AudioRecordingMessage =
  | {
      payload: OnAudioPauseProps;
      type: AudioRecordingEditorActionType.PauseAudio;
    }
  | {
      payload: OnAudioPlayProps;
      type: AudioRecordingEditorActionType.PlayAudio;
    }
  | {
      payload: SetAudioRecordingProps;
      type: AudioRecordingEditorActionType.SetAudioRecording;
    };

interface Props {
  onPause?: (props: OnAudioPauseProps) => Promise<void> | void;
  onPlay?: (props: OnAudioPlayProps) => Promise<void> | void;
}

export const AudioRecordingBridge = ({ onPause, onPlay }: Props = {}) =>
  new BridgeExtension<
    AudioRecordingEditorState,
    AudioRecordingEditorInstance,
    AudioRecordingMessage
  >({
    extendCSS: audioRecordingStyle,
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
    onEditorMessage: (message) => {
      if (message.type === AudioRecordingEditorActionType.PlayAudio) {
        onPlay?.(message.payload);

        return true;
      }

      if (message.type === AudioRecordingEditorActionType.PauseAudio) {
        onPause?.(message.payload);

        return true;
      }

      return false;
    },
    tiptapExtension: AudioRecording.configure(),
  });
