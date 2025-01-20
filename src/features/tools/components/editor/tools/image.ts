import {
  getMediaAssetsFrom,
  ImageSource,
} from "@app/core/utils/mediaAssetPicker";
import { i18n } from "@lingui/core";
import { t } from "@lingui/core/macro";
import { randomId } from "@madeja-studio/cepillo";
import { MediaTypeOptions } from "expo-image-picker/src/ImagePicker.types";

import { EditorTool, ToolCallbackArgs } from "./base";

const addImageToEditor = async ({
  editor,
  source,
}: ToolCallbackArgs & { source: ImageSource }) => {
  const result = await getMediaAssetsFrom(source, {
    allowsMultipleSelection: true,
    mediaTypes: MediaTypeOptions.Images,
    quality: 0.2,
  });

  if (result.tag === "error") {
    throw new Error(result.getMessage?.());
  }

  const images = result.assets.map(({ path }) => ({ fileName: path }));

  editor.setLocalImages({ groupId: randomId(), images });
};

export const ImageTool: EditorTool = {
  hasMenu: true,
  id: "image",
  image: () => require("@assets/icons/image.png"),
  isActive: () => false,
  isDisabled: () => false,
  menuOptions: [
    {
      key: "library",
      onPress: async (args) => {
        await addImageToEditor({ ...args, source: "media_library" });
      },
      text: t(i18n)`Photo Library`,
    },
    {
      key: "camera",
      onPress: async (args) => {
        await addImageToEditor({ ...args, source: "camera" });
      },
      text: t(i18n)`Take photo`,
    },
  ],
  tag: "icon",
};
