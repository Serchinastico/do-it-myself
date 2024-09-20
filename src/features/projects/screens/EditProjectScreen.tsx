import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { Project } from "@app/domain/project/project";
import { ProjectDetails } from "@app/features/projects/components/ProjectDetails";
import { t } from "@lingui/macro";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { StatusBar } from "react-native";

export const EditProjectScreen = ({
  navigation,
  route,
}: RootScreenProps<"editProject">) => {
  const { projectId } = route.params;

  const [project, setProject] = useAtom(
    derivedAtoms.projectAtomFamily(projectId)
  );

  const onProjectSave = useCallback(
    async (project: Omit<Project, "id">) => {
      setProject(project);
    },
    [setProject]
  );

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
