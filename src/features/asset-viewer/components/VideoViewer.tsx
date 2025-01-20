import { Header } from "@app/features/asset-viewer/components/header";
import { PlayableVideo } from "@app/features/asset-viewer/components/PlayableVideo";
import { OnPress } from "@madeja-studio/telar";
import * as FileSystem from "expo-file-system";
import invariant from "tiny-invariant";

interface Props {
  assetPaths: string[];
  onClose: OnPress;
}

export const VideoViewer = ({ assetPaths, onClose }: Props) => {
  invariant(
    assetPaths.length === 1,
    "We only allow one video in the viewer at a time"
  );

  const videoAssetPath = assetPaths[0];

  return (
    <>
      <Header.Video onClose={onClose} />

      <PlayableVideo
        key={videoAssetPath}
        uri={`${FileSystem.documentDirectory}${videoAssetPath}`}
      />
    </>
  );
};
