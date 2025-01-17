import { RootScreenProps } from "@app/core/navigation/routes";
import { IMAGES_DIRECTORY } from "@app/core/utils/mediaAssetPicker";
import { Header } from "@app/features/asset-viewer/components/Header";
import { PlayableVideo } from "@app/features/asset-viewer/components/PlayableVideo";
import { ZoomableImage } from "@app/features/asset-viewer/components/ZoomableImage";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { StatusBar, View } from "react-native";
import PagerView from "react-native-pager-view";

export const AssetViewerScreen = ({
  navigation,
  route,
}: RootScreenProps<"assetViewer">) => {
  const { assetPaths, initialImageIndex } = route.params;
  const [page, setPage] = useState(0);

  return (
    <View style={tw`flex-1 bg-secondary`}>
      <StatusBar barStyle="light-content" />

      <Header
        onClose={() => navigation.goBack()}
        page={{
          current: page + 1 /* 1-based index */,
          total: assetPaths.length,
        }}
      />

      <PagerView
        initialPage={initialImageIndex}
        onPageSelected={(event) => setPage(event.nativeEvent.position)}
        overdrag
        style={tw`flex-1`}
      >
        {assetPaths.map((imageFileName) =>
          imageFileName.startsWith(IMAGES_DIRECTORY) ? (
            <ZoomableImage
              key={imageFileName}
              uri={`${FileSystem.documentDirectory}${imageFileName}`}
            />
          ) : (
            <PlayableVideo
              key={imageFileName}
              uri={`${FileSystem.documentDirectory}${imageFileName}`}
            />
          )
        )}
      </PagerView>
    </View>
  );
};
