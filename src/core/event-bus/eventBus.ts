import { OnAudioPlayProps } from "@app/editor-web/src/extensions/audio-recording/audioRecording";
import mitt from "mitt";

export const EventMessage = {
  AudioPause: "audioPause",
  AudioPlay: "audioPlay",
  DatePress: "datePress",
  LocalImagePress: "localImagePress",
} as const;

export type EventName = keyof Events;

export type Events = {
  [EventMessage.AudioPause]: { fileName: string };
  [EventMessage.AudioPlay]: OnAudioPlayProps;
  [EventMessage.DatePress]: { date: string; id: string };
  [EventMessage.LocalImagePress]: { fileName: string; groupId: string };
};

const eventBus = mitt<Events>();

export default eventBus;
