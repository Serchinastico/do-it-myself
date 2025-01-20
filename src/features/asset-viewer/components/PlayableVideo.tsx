import { Video } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  uri: string;
}

export const PlayableVideo = ({ uri }: Props) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <Video
      shouldPlay
      source={{ uri }}
      style={[tw`flex-1`, { marginBottom: bottom }]}
      useNativeControls
      usePoster
    />
  );
};
