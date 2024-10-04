import mitt from "mitt";

export const EventMessage = {
  LocalImagePress: "localImagePress",
} as const;

export type Events = {
  [EventMessage.LocalImagePress]: { fileName: string };
};

export type EventName = keyof Events;

const eventBus = mitt<Events>();

export default eventBus;
