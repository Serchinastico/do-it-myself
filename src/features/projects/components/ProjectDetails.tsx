import { Button } from "@app/core/components/Button";
import { Input } from "@app/core/components/Input";
import { ScrollView } from "@app/core/components/ScrollView";
import { useRootNavigation } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import {
  EditedProject,
  getInitialManual,
  getInitialWorklog,
  ProjectColorId,
  ToolType,
} from "@app/domain/project";
import { ColorPicker } from "@app/features/projects/components/ColorPicker";
import { TagsPicker } from "@app/features/projects/components/TagsPicker";
import { ToolsPicker } from "@app/features/projects/components/ToolsPicker";
import { t } from "@lingui/macro";
import { Column, IconReference, OnPress, Row } from "@madeja-studio/telar";
import { useAtomValue } from "jotai/index";
import React, { useCallback, useRef, useState } from "react";
import { TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type DeleteProps =
  | { hasDeleteButton: true; onProjectDelete: OnPress }
  | { hasDeleteButton?: false };

type Props = {
  autoFocus: boolean;
  initialColorId: ProjectColorId;
  initialDescription?: string;
  initialName?: string;
  initialWantsAttachments: boolean;
  initialWantsManual: boolean;
  initialWantsWorklog: boolean;
  onProjectSave: (project: EditedProject) => Promise<void> | void;
  saveButtonIcon?: IconReference;
  saveButtonText: string;
} & DeleteProps;

export const ProjectDetails = ({
  autoFocus,
  initialColorId,
  initialDescription,
  initialName,
  initialWantsAttachments,
  initialWantsManual,
  initialWantsWorklog,
  onProjectSave,
  saveButtonIcon,
  saveButtonText,
  ...props
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

  const [hasNameError, setHasNameError] = useState(false);
  const [hasToolsError, setHasToolsError] = useState(false);

  const navigation = useRootNavigation();
  const { bottom } = useSafeAreaInsets();

  const nameRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const setWantsTool = useCallback(
    (tool: ToolType, value: boolean) => {
      switch (tool) {
        case "attachments":
          setWantsAttachments(value);
          setHasToolsError(!wantsManual && !wantsWorklog && !value);
          break;
        case "manual":
          setWantsManual(value);
          setHasToolsError(!value && !wantsWorklog && !wantsAttachments);
          break;
        case "worklog":
          setWantsWorklog(value);
          setHasToolsError(!wantsManual && !value && !wantsAttachments);
          break;
      }
    },
    [wantsAttachments, wantsManual, wantsWorklog]
  );

  const onPressSave = useCallback(async () => {
    if (name.trim() === "") {
      setHasNameError(true);
      nameRef.current?.focus();
      return;
    }

    if (!wantsManual && !wantsWorklog && !wantsAttachments) {
      setHasToolsError(true);
      return;
    }

    await onProjectSave({
      attachments: wantsAttachments ? { items: [] } : undefined,
      colorId,
      description,
      manual: wantsManual ? getInitialManual(colorId) : undefined,
      name,
      tagIds: selectedTagIds,
      worklog: wantsWorklog ? getInitialWorklog(colorId) : undefined,
    });
  }, [
    name,
    wantsAttachments,
    colorId,
    description,
    wantsManual,
    selectedTagIds,
    wantsWorklog,
    onProjectSave,
  ]);

  return (
    <ScrollView style={tw`px-4`}>
      <Column style={tw`pb-4`}>
        <Input
          autoFocus={autoFocus}
          errorMessage={t`Name is required`}
          hasError={hasNameError}
          onChangeText={(text) => {
            setHasNameError(false);
            setName(text);
          }}
          onSubmitEditing={() => descriptionRef.current?.focus()}
          placeholder={t`e.g. Hang mirror`}
          ref={nameRef}
          returnKeyType="next"
          title={t`Name`}
          value={name}
        />

        <Input
          onChangeText={setDescription}
          placeholder={t`e.g. Hand the new mirror in the bathroom`}
          ref={descriptionRef}
          returnKeyType="done"
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
          errorMessage={t`At least one tool must be selected`}
          hasError={hasToolsError}
          onWantsAttachmentsChange={(value) =>
            setWantsTool("attachments", value)
          }
          onWantsManualChange={(value) => setWantsTool("manual", value)}
          onWantsWorklogChange={(value) => setWantsTool("worklog", value)}
          wantsAttachments={wantsAttachments}
          wantsManual={wantsManual}
          wantsWorklog={wantsWorklog}
        />

        <Row style={[tw`center mt-6 gap-4`, { marginBottom: bottom }]}>
          {props.hasDeleteButton && (
            <Button
              onPress={props.onProjectDelete}
              text={t`Delete`}
              variant="text"
            />
          )}

          <Button
            icon={saveButtonIcon}
            onPress={onPressSave}
            text={saveButtonText}
          />
        </Row>
      </Column>
    </ScrollView>
  );
};
