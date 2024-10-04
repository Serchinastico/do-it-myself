import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { EditedProject } from "@app/domain/project/project";
import { ProjectDetails } from "@app/features/projects/components/ProjectDetails";
import { ToolRemovalConfirmationDialog } from "@app/features/projects/components/dialogs/ToolRemovalConfirmationDialog";
import { t } from "@lingui/macro";
import { ProjectHeader } from "features/projects/components/headers";
import { useAtom } from "jotai";
import { unwrap } from "jotai/utils";
import { useCallback, useState } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import invariant from "tiny-invariant";

export const EditProjectScreen = ({
  navigation,
  route,
}: RootScreenProps<"editProject">) => {
  const { projectId } = route.params;

  const [project, setProject] = useAtom(
    unwrap(derivedAtoms.projectAtomFamily(projectId))
  );
  const [editedProject, setEditedProject] = useState<
    EditedProject | undefined
  >();
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);

  const onProjectSave = useCallback(
    async (editedProject: EditedProject) => {
      invariant(project);

      const isRemovingManual = project.manual && !editedProject.manual;
      const isRemovingWorklog = project.worklog && !editedProject.worklog;
      const isRemovingAttachments =
        project.attachments && !editedProject.attachments;

      if (isRemovingManual || isRemovingWorklog || isRemovingAttachments) {
        setIsConfirmationDialogVisible(true);
        setEditedProject(editedProject);
      } else {
        setProject(editedProject);
        navigation.goBack();
      }
    },
    [project, setProject]
  );

  if (!project) {
    /**
     * This is not necessary because the times to fetch stuff from async storage
     * are minimal. However, this hints Typescript that we have a defined
     * project in the below components.
     */
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`bg-white android:mt-4 flex-1`}>
      <StatusBar barStyle="dark-content" />

      <ProjectHeader.EditProject onClose={() => navigation.goBack()} />

      <ProjectDetails
        autoFocus={false}
        initialColorId={project.colorId}
        initialDescription={project.description}
        initialName={project.name}
        initialWantsAttachments={project.attachments !== undefined}
        initialWantsManual={project.manual !== undefined}
        initialWantsWorklog={project.worklog !== undefined}
        onProjectSave={onProjectSave}
        saveButtonText={t`Save project`}
      />

      <ToolRemovalConfirmationDialog
        isVisible={isConfirmationDialogVisible}
        onAccept={() => {
          invariant(editedProject);

          setProject(editedProject);
          navigation.goBack();
        }}
        onClose={() => setIsConfirmationDialogVisible(false)}
      />
    </View>
  );
};