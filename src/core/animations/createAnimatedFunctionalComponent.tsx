import React, {
  ComponentProps,
  forwardRef,
  FunctionComponent,
  PropsWithChildren,
} from "react";
import Animated from "react-native-reanimated";

/**
 * A utility function `createAnimatedComponent` that wraps a provided React functional component
 * to create an animated component. It uses `forwardRef` to make it work with functional components.
 *
 * @param component - The functional component to be wrapped to support animations.
 * @returns A new component that forwards refs and supports children and additional props.
 *
 * @example
 * import React from 'react';
 * import { createAnimatedComponent } from './pathToUtility';
 *
 * const MyComponent = (props) => {
 *   return <div {...props}>Hello World</div>;
 * };
 *
 * const AnimatedMyComponent = createAnimatedComponent(MyComponent);
 *
 * function App() {
 *   return (
 *     <AnimatedMyComponent style={{ opacity: 0.5 }}>
 *       Content goes here
 *     </AnimatedMyComponent>
 *   );
 * }
 */
export const createAnimatedFunctionalComponent = <T extends FunctionComponent>(
  component: T
) =>
  Animated.createAnimatedComponent(
    forwardRef<{}, ComponentProps<T> & PropsWithChildren>(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ children, ...props }, _ref) =>
        React.createElement(component, props, children)
    )
  );
