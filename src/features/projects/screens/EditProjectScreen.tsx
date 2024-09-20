import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { Project } from "@app/domain/project/project";
import { ProjectDetails } from "@app/features/projects/components/ProjectDetails";
import { t } from "@lingui/macro";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
import { useAtom } from "jotai";
import { unwrap } from "jotai/utils";
import { useCallback } from "react";
import { ActivityIndicator, StatusBar } from "react-native";

export const EditProjectScreen = ({
  navigation,
  route,
}: RootScreenProps<"editProject">) => {
  const { projectId } = route.params;

  const [project, setProject] = useAtom(
    unwrap(derivedAtoms.projectAtomFamily(projectId))
  );

  const onProjectSave = useCallback(
    async (project: Omit<Project, "id">) => {
      setProject(project);
    },
    [setProject]
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
    <>
      <StatusBar barStyle="dark-content" />

      <ProjectHeader.EditProject onClose={() => navigation.goBack()} />

      <ProjectDetails
        initialColorId={project.colorId}
        initialDescription={project.description}
        initialName={project.name}
        initialWantsAttachments={project.attachments !== undefined}
        initialWantsManual={project.manual !== undefined}
        initialWantsWorklog={project.worklog !== undefined}
        onProjectSave={onProjectSave}
        saveButtonText={t`Save project`}
      />
    </>
  );
};
