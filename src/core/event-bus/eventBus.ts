import {
  OnAudioPauseProps,
  OnAudioPlayProps,
} from "@app/editor-web/src/extensions/audio-recording/audioRecording";
import { OnDateClickProps } from "@app/editor-web/src/extensions/date/date";
import { OnImageClickProps } from "@app/editor-web/src/extensions/local-image/localImage";
import mitt from "mitt";

export const EventMessage = {
  AudioPause: "audioPause",
  AudioPlay: "audioPlay",
  DatePress: "datePress",
  LocalImagePress: "localImagePress",
} as const;

export type EventName = keyof Events;

export type Events = {
  [EventMessage.AudioPause]: OnAudioPauseProps;
  [EventMessage.AudioPlay]: OnAudioPlayProps;
  [EventMessage.DatePress]: OnDateClickProps;
  [EventMessage.LocalImagePress]: OnImageClickProps;
};

const eventBus = mitt<Events>();

export default eventBus;
