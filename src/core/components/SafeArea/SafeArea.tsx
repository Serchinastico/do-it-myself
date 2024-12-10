import {
  navigationRef,
  NavigationScreenOptions,
} from "@app/core/navigation/routes";
import { SafeAreaView } from "@madeja-studio/telar";
import { PropsWithChildren, useEffect, useState } from "react";
import { Platform } from "react-native";
import {
  SafeAreaViewProps,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = PropsWithChildren & SafeAreaViewProps;

export const SafeArea = ({ children, style, ...props }: Props) => {
  const navigationOptions =
    navigationRef.current?.getCurrentOptions() as NavigationScreenOptions;

  const { top } = useSafeAreaInsets();
  const [isModal, setIsModal] = useState(
    navigationOptions?.presentation === "modal"
  );

  useEffect(() => {
    return navigationRef.current?.addListener("options", ({ data }) => {
      const options = data.options as NavigationScreenOptions;

      setIsModal(options.presentation === "modal");
    });
  }, []);

  return (
    <SafeAreaView
      style={[
        tw.style(
          `bg-white dark:bg-ash`,
          isModal &&
            Platform.OS === "android" && {
              flex: 1,
              paddingTop: top,
            }
        ),
        style,
      ]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};
