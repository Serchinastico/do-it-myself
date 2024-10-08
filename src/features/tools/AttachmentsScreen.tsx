import { FlashList } from "@app/core/components/FlashList";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { EmptyAttachments } from "@app/features/tools/components/attachments/EmptyAttachments";
import { SafeAreaView } from "@madeja-studio/telar";
import { useAtom } from "jotai/index";
import { Text, View } from "react-native";

import { ToolHeader } from "./components/headers";

export const AttachmentsScreen = ({
  navigation,
  route,
}: RootScreenProps<"attachments">) => {
  const { projectId } = route.params;
  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );
  const attachments = project.attachments?.items ?? [];

  return (
    <SafeAreaView>
      <ToolHeader.Attachments onClose={() => navigation.goBack()} />

      <View style={tw`flex-1`}>
        <FlashList
          ListEmptyComponent={<EmptyAttachments />}
          ListFooterComponentStyle={tw`flex-1`}
          contentContainerStyle={tw`pb-28`}
          data={attachments}
          estimatedItemSize={200}
          renderItem={({ item }) => {
            switch (item.tag) {
              case "image":
                return <Text>{item.uri}</Text>;
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};
