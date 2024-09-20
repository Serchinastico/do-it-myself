import { Button } from "@app/core/components/Button";
import { Input } from "@app/core/components/Input";
import { useRootNavigation } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { ProjectColorId } from "@app/domain/project";
import { Project } from "@app/domain/project/project";
import { ColorPicker } from "@app/features/projects/components/ColorPicker";
import { TagsPicker } from "@app/features/projects/components/TagsPicker";
import { ToolsPicker } from "@app/features/projects/components/ToolsPicker";
import { t } from "@lingui/macro";
import { Column, IconReference } from "@madeja-studio/telar";
import { useAtomValue } from "jotai/index";
import { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  initialColorId: ProjectColorId;
  initialDescription?: string;
  initialName?: string;
  initialWantsAttachments: boolean;
  initialWantsManual: boolean;
  initialWantsWorklog: boolean;
  onProjectSave: (project: Omit<Project, "id">) => Promise<void> | void;
  saveButtonIcon?: IconReference;
  saveButtonText: string;
}

export const ProjectDetails = ({
  initialColorId,
  initialDescription,
  initialName,
  initialWantsAttachments,
  initialWantsManual,
  initialWantsWorklog,
  onProjectSave,
  saveButtonIcon,
  saveButtonText,
}: Props) => {
  const [name, setName] = useState(initialName ?? "");
  const [description, setDescription] = useState(initialDescription);
  const [colorId, setColorId] = useState<ProjectColorId>(initialColorId);
  const selectedTagIds = useAtomValue(atoms.selectedTagIds);
  const [wantsManual, setWantsManual] = useState(initialWantsManual);
  const [wantsWorklog, setWantsWorklog] = useState(initialWantsWorklog);
  const [wantsAttachments, setWantsAttachments] = useState(
    initialWantsAttachments
  );

  const navigation = useRootNavigation();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView style={tw`px-4`}>
      <Column>
        <Input
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
          icon={saveButtonIcon}
          onPress={async () => {
            await onProjectSave({
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
          text={saveButtonText}
        />
      </Column>
    </ScrollView>
  );
};
