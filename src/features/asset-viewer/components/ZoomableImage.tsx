import { ImageZoom } from "@likashefqet/react-native-image-zoom";

interface Props {
  uri: string;
}

export const ZoomableImage = ({ uri }: Props) => {
  return <ImageZoom uri={uri} />;
};
