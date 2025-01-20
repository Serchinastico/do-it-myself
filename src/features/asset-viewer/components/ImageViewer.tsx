import { Header } from "@app/features/asset-viewer/components/header";
import { ZoomableImage } from "@app/features/asset-viewer/components/ZoomableImage";
import { OnPress } from "@madeja-studio/telar";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import PagerView from "react-native-pager-view";

interface Props {
  assetPaths: string[];
  initialImageIndex: number;
  onClose: OnPress;
}

export const ImageViewer = ({
  assetPaths,
  initialImageIndex,
  onClose,
}: Props) => {
  const [page, setPage] = useState(0);

  return (
    <>
      <Header.Image
        onClose={onClose}
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
        {assetPaths.map((imageFileName) => (
          <ZoomableImage
            key={imageFileName}
            uri={`${FileSystem.documentDirectory}${imageFileName}`}
          />
        ))}
      </PagerView>
    </>
  );
};
