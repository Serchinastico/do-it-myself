import { Button } from "@app/core/components/Button";
import { Input } from "@app/core/components/Input";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { PROJECT_COLORS, ProjectColorId } from "@app/domain/project";
import { ColorPicker } from "@app/features/projects/components/ColorPicker";
import { TagsPicker } from "@app/features/projects/components/TagsPicker";
import { ToolsPicker } from "@app/features/projects/components/ToolsPicker";
import { t } from "@lingui/macro";
import { oneOf } from "@madeja-studio/cepillo";
import { Column } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CreateProjectScreen = ({
  navigation,
}: RootScreenProps<"createProject">) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [colorId, setColorId] = useState<ProjectColorId>(
    oneOf(PROJECT_COLORS).id
  );
  const selectedTagIds = useAtomValue(atoms.selectedTagIds);
  const [wantsManual, setWantsManual] = useState(true);
  const [wantsWorklog, setWantsWorklog] = useState(true);
  const [wantsAttachments, setWantsAttachments] = useState(true);
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <ProjectHeader.CreateProject onClose={() => navigation.goBack()} />

      <ScrollView style={tw`px-4`}>
        <Column>
          <Input
            autoFocus
            onChangeText={setName}
            placeholder={t`e.g. Hang mirror`}
            title={t`Name`}
            value={name}
          />

          <Input
            onChangeText={setDescription}
            placeholder={t`e.g. Hand the new mirror in the bathroom`}
            style={tw`mt-4`}
            title={t`Description`}
            value={description}
          />

          <ColorPicker onColorChange={setColorId} selectedColorId={colorId} />

          <TagsPicker
            onPress={() => navigation.navigate("addTags")}
            tagIds={selectedTagIds}
          />

          <ToolsPicker
            onWantsAttachmentsChange={setWantsAttachments}
            onWantsManualChange={setWantsManual}
            onWantsWorklogChange={setWantsWorklog}
            wantsAttachments={wantsAttachments}
            wantsManual={wantsManual}
            wantsWorklog={wantsWorklog}
          />

          <Button
            icon={{ family: "Feather", name: "plus" }}
            onPress={() => navigation.goBack()}
            style={[tw`center mt-6`, { marginBottom: bottom }]}
            text={t`Create project`}
          />
        </Column>
      </ScrollView>
    </>
  );
};
