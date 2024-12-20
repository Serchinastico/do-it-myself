import { MasonryFlashList } from "@app/core/components/FlashList/MasonryFlashList";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { getImagesFrom, ImageSource } from "@app/core/utils/imagePicker";
import { Attachment, getProjectColorById } from "@app/domain/project";
import { AddAttachmentButton } from "@app/features/tools/components/attachments/AddAttachmentButton";
import { EmptyAttachments } from "@app/features/tools/components/attachments/EmptyAttachments";
import { SafeAreaViewEdges } from "@madeja-studio/telar";
import { useAtom } from "jotai/index";
import { useCallback, useMemo } from "react";

import { AttachmentImage } from "../components/attachments/AttachmentImage";
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
    (attachment: Attachment) => {
      const updatedAttachments = attachments.filter(
        (item) => item.id !== attachment.id
      );
      setProject({ ...project, attachments: { items: updatedAttachments } });
    },
    [project, attachments]
  );

  const onAddAttachment = useCallback(
    async (source: ImageSource) => {
      const result = await getImagesFrom(source);

      if (result.tag === "error") {
        throw new Error(result.message);
      }

      const editedItems = [
        ...attachments,
        ...result.images.map((image) => ({
          ...image,
          tag: "image" as const,
        })),
      ];
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
                    navigation.navigate("imageViewer", {
                      imagePaths: [item.path],
                      initialImageIndex: 0,
                    })
                  }
                  tint={getProjectColorById(project.colorId).hex}
                />
              );
          }
        }}
      />

      <AddAttachmentButton onAddAttachment={onAddAttachment} />
    </SafeArea>
  );
};
