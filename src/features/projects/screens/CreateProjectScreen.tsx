import { Input } from "@app/core/components/Input";
import { RootScreenProps } from "@app/core/navigation/routes";
import {
  PROJECT_COLORS,
  PROJECT_TAGS,
  ProjectColorId,
} from "@app/domain/project";
import { ProjectTag } from "@app/domain/project/tags";
import { ColorPicker } from "@app/features/projects/components/ColorPicker";
import { TagsPicker } from "@app/features/projects/components/TagsPicker";
import { ToolsPicker } from "@app/features/projects/components/ToolsPicker";
import { t } from "@lingui/macro";
import { oneOf } from "@madeja-studio/cepillo";
import { Button, Column } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
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
  const [tags, setTags] = useState<readonly ProjectTag[]>(
    PROJECT_TAGS.category
  );
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
            tags={tags}
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
            hasHapticFeedback
            icon={{ family: "Feather", name: "plus" }}
            style={[tw`center mt-6`, { marginBottom: bottom }]}
            text={t`Create project`}
          />
        </Column>
      </ScrollView>
    </>
  );
};
