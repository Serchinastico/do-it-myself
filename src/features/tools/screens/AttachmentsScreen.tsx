import { MasonryFlashList } from "@app/core/components/FlashList/MasonryFlashList";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import {
  getMediaAssetsFrom,
  ImageSource,
} from "@app/core/utils/mediaAssetPicker";
import { getProjectColorById, LocalMediaAsset } from "@app/domain/project";
import { AddAttachmentButton } from "@app/features/tools/components/attachments/AddAttachmentButton";
import { EmptyAttachments } from "@app/features/tools/components/attachments/EmptyAttachments";
import { SafeAreaViewEdges } from "@madeja-studio/telar";
import { useAtom } from "jotai/index";
import { useCallback, useMemo } from "react";

import { AttachmentImage } from "../components/attachments/AttachmentImage";
import { AttachmentVideo } from "../components/attachments/AttachmentVideo";
import { ToolHeader } from "../components/headers";

const NUM_COLUMNS = 2;

export const AttachmentsScreen = ({
  navigation,
  route,
}: RootScreenProps<"attachments">) => {
  const { projectId } = route.params;
  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );
  const attachments = useMemo(
    () => project.attachments?.items ?? [],
    [project]
  );

  const onDeleteAttachment = useCallback(
    (attachment: LocalMediaAsset) => {
      const updatedAttachments = attachments.filter(
        (item) => item.id !== attachment.id
      );
      setProject({ ...project, attachments: { items: updatedAttachments } });
    },
    [project, attachments]
  );

  const onAddAttachment = useCallback(
    async (source: ImageSource) => {
      const result = await getMediaAssetsFrom(source);

      if (result.tag === "error") {
        throw new Error(result.getMessage?.());
      }

      const editedItems = [...attachments, ...result.assets];
      setProject({ ...project, attachments: { items: editedItems } });
    },
    [project, attachments]
  );

  return (
    <SafeArea edges={SafeAreaViewEdges.NoBottom}>
      <ToolHeader.Attachments onClose={() => navigation.goBack()} />

      <MasonryFlashList
        contentContainerStyle={tw`pb-28 px-4`}
        data={attachments}
        estimatedItemSize={200}
        ListEmptyComponent={<EmptyAttachments />}
        numColumns={NUM_COLUMNS}
        renderItem={({ item }) => {
          switch (item.tag) {
            case "image":
              return (
                <AttachmentImage
                  colSpan={NUM_COLUMNS}
                  image={item}
                  onDelete={() => onDeleteAttachment(item)}
                  onPress={() =>
                    navigation.navigate("assetViewer", {
                      assetPaths: [item.path],
                      initialImageIndex: 0,
                    })
                  }
                  tint={getProjectColorById(project.colorId).hex}
                />
              );
            case "video":
              return (
                <AttachmentVideo
                  colSpan={NUM_COLUMNS}
                  onDelete={() => onDeleteAttachment(item)}
                  onPress={() =>
                    navigation.navigate("assetViewer", {
                      assetPaths: [item.path],
                      initialImageIndex: 0,
                    })
                  }
                  tint={getProjectColorById(project.colorId).hex}
                  video={item}
                />
              );
          }
        }}
      />

      <AddAttachmentButton onAddAttachment={onAddAttachment} />
    </SafeArea>
  );
};
