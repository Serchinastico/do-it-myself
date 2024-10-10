import { EventMessage } from "@app/core/event-bus/eventBus";
import useEventBus from "@app/core/event-bus/useEventBus";
import { RootNavigation } from "@app/core/navigation/routes";
import { JsonDocument } from "@app/features/tools/hooks/useRichTextEditor";
import invariant from "tiny-invariant";

interface Props {
  isEditing?: boolean;
  json: JsonDocument;
  navigation: Pick<RootNavigation, "navigate">;
}

export const useLocalImagePressHandler = ({
  isEditing,
  json,
  navigation,
}: Props) => {
  useEventBus(
    EventMessage.LocalImagePress,
    ({ fileName, groupId }) => {
      if (isEditing) return;

      const node = json?.content.find(
        (node) =>
          node.type === "local-image" && node.attrs["groupId"] === groupId
      );

      invariant(node);

      const images = node.attrs["images"] as { fileName: string }[];
      const imagePaths = images.map(({ fileName }) => fileName);
      const initialImageIndex = imagePaths.indexOf(fileName);

      navigation.navigate("imageViewer", {
        imagePaths,
        initialImageIndex,
      });
    },
    [json]
  );
};
