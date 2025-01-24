import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms, derivedAtoms } from "@app/core/storage/state";
import { EditedProject } from "@app/domain/project/project";
import { Dialog } from "@app/features/projects/components/dialogs";
import { ProjectDetails } from "@app/features/projects/components/ProjectDetails";
import { useLingui } from "@lingui/react/macro";
import { SafeAreaViewEdges } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/headers";
import { useAtom, useSetAtom } from "jotai";
import { unwrap } from "jotai/utils";
import { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import invariant from "tiny-invariant";

export const EditProjectScreen = ({
  navigation,
  route,
}: RootScreenProps<"editProject">) => {
  const { projectId } = route.params;

  const setProjects = useSetAtom(atoms.projects);
  const [project, setProject] = useAtom(
    unwrap(derivedAtoms.projectAtomFamily(projectId))
  );
  const [editedProject, setEditedProject] = useState<
    EditedProject | undefined
  >();
  const [isToolRemovalDialogVisible, setIsToolRemovalDialogVisible] =
    useState(false);
  const [isProjectDeletionDialogVisible, setIsProjectDeletionDialogVisible] =
    useState(false);

  const { t } = useLingui();

  const onProjectSave = useCallback(
    async (editedProject: EditedProject) => {
      invariant(project);

      const isRemovingManual = project.manual && !editedProject.manual;
      const isRemovingWorklog = project.worklog && !editedProject.worklog;
      const isRemovingAttachments =
        project.attachments && !editedProject.attachments;

      if (isRemovingManual || isRemovingWorklog || isRemovingAttachments) {
        setIsToolRemovalDialogVisible(true);
        setEditedProject(editedProject);
      } else {
        setProject(editedProject);
        navigation.goBack();
      }
    },
    [project, setProject]
  );

  const onProjectDelete = useCallback(async () => {
    invariant(project);

    await setProjects(async (projects) =>
      (await projects).filter((p) => p.id !== project.id)
    );
    navigation.goBack();
  }, [project]);

  if (!project) {
    /**
     * This is not necessary because the times to fetch stuff from async storage
     * are minimal. However, this hints Typescript that we have a defined
     * project in the below components.
     */
    return <ActivityIndicator />;
  }

  return (
    <SafeArea edges={SafeAreaViewEdges.NoTop}>
      <ProjectHeader.EditProject onClose={() => navigation.goBack()} />

      <ProjectDetails
        autoFocus={false}
        hasDeleteButton
        initialColorId={project.colorId}
        initialDescription={project.description}
        initialName={project.name}
        initialWantsAttachments={project.attachments !== undefined}
        initialWantsManual={project.manual !== undefined}
        initialWantsWorklog={project.worklog !== undefined}
        onProjectDelete={() => setIsProjectDeletionDialogVisible(true)}
        onProjectSave={onProjectSave}
        saveButtonText={t`Save`}
      />

      <Dialog.ToolRemoval
        isVisible={isToolRemovalDialogVisible}
        onAccept={() => {
          invariant(editedProject);

          setProject(editedProject);
          navigation.goBack();
        }}
        onClose={() => setIsToolRemovalDialogVisible(false)}
      />

      <Dialog.ProjectDeletion
        isVisible={isProjectDeletionDialogVisible}
        onAccept={onProjectDelete}
        onClose={() => setIsProjectDeletionDialogVisible(false)}
      />
    </SafeArea>
  );
};
