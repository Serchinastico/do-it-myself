import { DependencyList, useEffect, useRef } from "react";

/**
 * A custom hook that sets up a repeating interval to execute a given callback function.
 * The interval can be controlled using the delay parameter. The callback function
 * can return a boolean indicating whether the interval should continue (true)
 * or be cleared (false). This hook responds to changes in the provided dependencies.
 *
 * @param callback A function to be executed at each interval tick. The function
 *                 can return a boolean indicating whether to continue the interval.
 * @param delay The time in milliseconds between each execution of the callback function.
 *              If set to null, the interval is paused.
 * @param deps An array of dependencies that will trigger re-creation of the interval when changed.
 *
 * @example
 * // Usage example
 * useInterval(() => {
 *   // Your code here
 *   // return true to continue the interval, false to stop
 * }, 1000, [dependency1, dependency2]);
 */
export const useInterval = (
  callback: () => boolean,
  delay: null | number,
  deps: DependencyList = [] // Add dependency array
) => {
  const savedCallback = useRef<(() => boolean) | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback, ...deps]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    function tick() {
      if (savedCallback.current) {
        const shouldContinue = savedCallback.current();
        if (!shouldContinue && intervalId) {
          clearInterval(intervalId);
          intervalId = undefined;
        }
      }
    }

    if (delay !== null) {
      intervalId = setInterval(tick, delay);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [delay, ...deps]);
};
