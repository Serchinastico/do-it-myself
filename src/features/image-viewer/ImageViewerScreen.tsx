import { RootScreenProps } from "@app/core/navigation/routes";
import { Header } from "@app/features/image-viewer/components/Header";
import { ZoomableImage } from "@app/features/image-viewer/components/ZoomableImage";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { StatusBar, View } from "react-native";
import PagerView from "react-native-pager-view";

export const ImageViewerScreen = ({
  navigation,
  route,
}: RootScreenProps<"imageViewer">) => {
  const { imagePaths, initialImageIndex } = route.params;
  const [page, setPage] = useState(0);

  return (
    <View style={tw`flex-1 bg-secondary`}>
      <StatusBar barStyle="light-content" />

      <Header
        onClose={() => navigation.goBack()}
        page={{
          current: page + 1 /* 1-based index */,
          total: imagePaths.length,
        }}
      />

      <PagerView
        initialPage={initialImageIndex}
        onPageSelected={(event) => setPage(event.nativeEvent.position)}
        overdrag
        style={tw`flex-1`}
      >
        {imagePaths.map((imageFileName) => (
          <ZoomableImage
            key={imageFileName}
            uri={`${FileSystem.documentDirectory}${imageFileName}`}
          />
        ))}
      </PagerView>
    </View>
  );
};
