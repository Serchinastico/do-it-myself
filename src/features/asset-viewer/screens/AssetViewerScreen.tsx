import { RootScreenProps } from "@app/core/navigation/routes";
import { VIDEOS_DIRECTORY } from "@app/core/utils/mediaAssetPicker";
import { ImageViewer } from "@app/features/asset-viewer/components/ImageViewer";
import { VideoViewer } from "@app/features/asset-viewer/components/VideoViewer";
import { StatusBar, View } from "react-native";

export const AssetViewerScreen = ({
  navigation,
  route,
}: RootScreenProps<"assetViewer">) => {
  const { assetPaths, initialImageIndex } = route.params;

  const isVideo = assetPaths.some((path) => path.startsWith(VIDEOS_DIRECTORY));

  return (
    <View style={tw`flex-1 bg-secondary`}>
      <StatusBar barStyle="light-content" />

      {isVideo ? (
        <VideoViewer
          assetPaths={assetPaths}
          onClose={() => navigation.goBack()}
        />
      ) : (
        <ImageViewer
          assetPaths={assetPaths}
          initialImageIndex={initialImageIndex}
          onClose={() => navigation.goBack()}
        />
      )}
    </View>
  );
};
