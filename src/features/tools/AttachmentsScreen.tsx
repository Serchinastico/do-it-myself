import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { EmptyAttachments } from "@app/features/tools/components/attachments/EmptyAttachments";
import { SafeAreaView } from "@madeja-studio/telar";
import { useAtom } from "jotai/index";
import { FlatList, Text } from "react-native";

import { ToolHeader } from "./components/headers";

export const AttachmentsScreen = ({
  navigation,
  route,
}: RootScreenProps<"attachments">) => {
  const { projectId } = route.params;
  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );

  return (
    <SafeAreaView>
      <ToolHeader.Attachments onClose={() => navigation.goBack()} />

      <FlatList
        ListEmptyComponent={EmptyAttachments}
        data={project.attachments?.items ?? []}
        renderItem={({ item }) => {
          switch (item.tag) {
            case "image":
              return <Text>{item.uri}</Text>;
          }
        }}
      />
    </SafeAreaView>
  );
};
