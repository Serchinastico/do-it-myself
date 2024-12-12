import { Center } from "@madeja-studio/telar";
import { PropsWithChildren, useRef } from "react";
import { ViewStyle } from "react-native";
import ViewShot from "react-native-view-shot";
import useAsyncEffect from "use-async-effect";

export interface Props extends PropsWithChildren {
  onGenerateCapture: (uri: string) => void;
  style?: ViewStyle;
}

/**
 * A React component that captures its child component(s) as an image.
 *
 * This component uses `react-native-view-shot` to capture its child element(s)
 * and returns the generated image URI through the `onGenerateCapture` callback.
 *
 * @param children - The content to be captured as an image.
 * @param onGenerateCapture - A callback function that receives the generated image URI.
 *
 * Example usage:
 * ```
 * <CaptureView onGenerateCapture={(uri) => console.log('Captured Image URI:', uri)}>
 *   <YourContentComponent />
 * </CaptureView>
 * ```
 */
export const CaptureView = ({ children, onGenerateCapture, style }: Props) => {
  const viewShotRef = useRef<ViewShot>(null);

  useAsyncEffect(async () => {
    const uri = await viewShotRef.current?.capture?.();
    if (uri) onGenerateCapture(uri);
  }, [onGenerateCapture]);

  return (
    <Center style={[tw`absolute left-[2000px]`, style]}>
      <ViewShot
        options={{ fileName: "Your-File-Name", quality: 0.9 }}
        ref={viewShotRef}
      >
        {children}
      </ViewShot>
    </Center>
  );
};
