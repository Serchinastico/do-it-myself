import mitt from "mitt";

export const EventMessage = {
  DatePress: "datePress",
  LocalImagePress: "localImagePress",
} as const;

export type Events = {
  [EventMessage.DatePress]: { date: string; id: string };
  [EventMessage.LocalImagePress]: { fileName: string; groupId: string };
};

export type EventName = keyof Events;

const eventBus = mitt<Events>();

export default eventBus;
