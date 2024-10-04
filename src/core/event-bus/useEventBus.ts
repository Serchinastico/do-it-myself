import { useEffect, useRef } from "react";

import eventBus, { EventName, Events } from "./eventBus";

type EventCallback<T> = (data: T) => Promise<void> | void;

/**
 * Hook to subscribe to an event from the event bus and execute a callback when the event is emitted.
 *
 * @param eventName - The name of the event to subscribe to.
 * @param callback - The function to execute when the event is emitted, receiving event data as an argument.
 *
 * @example
 * useEventBus('userLoggedIn', (userData) => {
 *   console.log('User logged in:', userData);
 * });
 */
const useEventBus = <TName extends EventName>(
  eventName: TName,
  callback: EventCallback<Events[TName]>
) => {
  const savedCallback = useRef<EventCallback<Events[TName]>>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (data: Events[TName]) => {
      if (savedCallback.current) {
        savedCallback.current(data);
      }
    };

    eventBus.on(eventName, handler);

    return () => {
      eventBus.off(eventName, handler);
    };
  }, [eventName]);
};

export default useEventBus;
