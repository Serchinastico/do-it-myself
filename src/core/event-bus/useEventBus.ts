import { DependencyList, useEffect, useRef } from "react";

import eventBus, { EventName, Events } from "./eventBus";

type EventCallback<T> = (data: T) => Promise<void> | void;

/**
 * Registers an event listener on the event bus for a specified event name. The callback function
 * will be triggered whenever the event is emitted. Optimized to handle dependency changes
 * efficiently using React hooks.
 *
 * @param eventName - The name of the event to listen for.
 * @param callback - A function to be called when the event is emitted.
 * @param deps - An optional array of dependencies that, when changed, will re-register the callback.
 *
 * @return A cleanup function to deregister the event listener from the event bus.
 *
 * @example
 * useEventBus('dataFetched', (data) => {
 *   console.log('Data received:', data);
 * }, [dependency1, dependency2]);
 */
const useEventBus = <TName extends EventName>(
  eventName: TName,
  callback: EventCallback<Events[TName]>,
  deps: DependencyList
) => {
  const savedCallback = useRef<EventCallback<Events[TName]>>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback, ...deps]);

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
