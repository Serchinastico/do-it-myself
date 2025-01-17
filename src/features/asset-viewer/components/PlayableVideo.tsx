import { Video } from "expo-av";
import { Dimensions } from "react-native";

interface Props {
  uri: string;
}

export const PlayableVideo = ({ uri }: Props) => {
  const { height, width } = Dimensions.get("screen");
  return (
    <Video
      shouldPlay
      source={{ uri }}
      style={[tw`mt-4`, { height, width }]}
      useNativeControls
      usePoster
    />
  );
};
