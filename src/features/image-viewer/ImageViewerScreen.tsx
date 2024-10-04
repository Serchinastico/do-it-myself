import { RootScreenProps } from "@app/core/navigation/routes";
import { Header } from "@app/features/image-viewer/components/Header";
import * as FileSystem from "expo-file-system";
import { Image, StatusBar, View } from "react-native";
import PagerView from "react-native-pager-view";

export const ImageViewerScreen = ({
  navigation,
  route,
}: RootScreenProps<"imageViewer">) => {
  const { imageFileNames, initialImageIndex } = route.params;

  return (
    <View style={tw`flex-1 bg-secondary`}>
      <Header onClose={() => navigation.goBack()} />

      <StatusBar barStyle="light-content" />

      <PagerView initialPage={initialImageIndex} overdrag style={tw`flex-1`}>
        {imageFileNames.map((imageFileName) => (
          <Image
            key={imageFileName}
            source={{
              uri: `${FileSystem.documentDirectory}${imageFileName}`,
            }}
            style={tw`w-100 contain`}
          />
        ))}
      </PagerView>
    </View>
  );
};
