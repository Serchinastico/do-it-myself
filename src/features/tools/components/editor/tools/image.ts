import { ImageSource, getImageFrom } from "@app/core/utils/imagePicker";
import { t } from "@lingui/macro";
import * as FileSystem from "expo-file-system";

import { EditorTool, ToolCallbackArgs } from "./base";

const addImageToEditor = async ({
  editor,
  source,
}: { source: ImageSource } & ToolCallbackArgs) => {
  const result = await getImageFrom(source);

  if (result.tag === "error") {
    throw new Error(result.message);
  }

  const uri = `${FileSystem.documentDirectory}${result.uri}`;

  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  editor.setLocalImage({ base64, uri });
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
      text: t`Photo Library`,
    },
    {
      key: "camera",
      onPress: async (args) => {
        await addImageToEditor({ ...args, source: "camera" });
      },
      text: t`Take photo`,
    },
  ],
};
