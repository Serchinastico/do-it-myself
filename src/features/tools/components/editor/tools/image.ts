import { ImageSource, getImagesFrom } from "@app/core/utils/imagePicker";
import { t } from "@lingui/macro";
import { randomId } from "@madeja-studio/cepillo";

import { EditorTool, ToolCallbackArgs } from "./base";

const addImageToEditor = async ({
  editor,
  source,
}: { source: ImageSource } & ToolCallbackArgs) => {
  const result = await getImagesFrom(source);

  if (result.tag === "error") {
    throw new Error(result.message);
  }

  const images = result.images.map(({ path }) => ({ fileName: path }));

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
