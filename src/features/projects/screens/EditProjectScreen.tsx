import { Button } from "@app/core/components/Button";
import { Input } from "@app/core/components/Input";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms, derivedAtoms } from "@app/core/storage/state";
import { ProjectColorId } from "@app/domain/project";
import { ColorPicker } from "@app/features/projects/components/ColorPicker";
import { TagsPicker } from "@app/features/projects/components/TagsPicker";
import { ToolsPicker } from "@app/features/projects/components/ToolsPicker";
import { t } from "@lingui/macro";
import { Column } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const EditProjectScreen = ({
  navigation,
  route,
}: RootScreenProps<"editProject">) => {
  const { projectId } = route.params;

  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [colorId, setColorId] = useState<ProjectColorId>(project.colorId);

  const selectedTagIds = useAtomValue(atoms.selectedTagIds);
  const [wantsManual, setWantsManual] = useState(project.manual !== undefined);
  const [wantsWorklog, setWantsWorklog] = useState(
    project.worklog !== undefined
  );
  const [wantsAttachments, setWantsAttachments] = useState(
    project.attachments !== undefined
  );
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="dark-content" />

      <ProjectHeader.EditProject onClose={() => navigation.goBack()} />

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
            onPress={() => {
              // TODO Warn user if they are about to delete something

              setProject({
                attachments: wantsAttachments ? {} : undefined,
                colorId,
                description,
                manual: wantsManual ? {} : undefined,
                name,
                tagIds: selectedTagIds,
                worklog: wantsWorklog ? {} : undefined,
              });
              navigation.goBack();
            }}
            style={[tw`center mt-6`, { marginBottom: bottom }]}
            text={t`Create project`}
          />
        </Column>
      </ScrollView>
    </>
  );
};
