import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { PROJECT_COLORS } from "@app/domain/project";
import { EditedProject } from "@app/domain/project/project";
import { ProjectDetails } from "@app/features/projects/components/ProjectDetails";
import { useLingui } from "@lingui/react/macro";
import { oneOf, randomId } from "@madeja-studio/cepillo";
import { SafeAreaViewEdges } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/headers";
import { useSetAtom } from "jotai";
import { useCallback } from "react";

export const CreateProjectScreen = ({
  navigation,
}: RootScreenProps<"createProject">) => {
  const setProjects = useSetAtom(atoms.projects);
  const { t } = useLingui();

  const onProjectSave = useCallback(
    async (project: EditedProject) => {
      await setProjects(async (projects) => [
        ...(await projects),
        { ...project, id: randomId() },
      ]);

      navigation.goBack();
    },
    [setProjects]
  );

  return (
    <SafeArea edges={SafeAreaViewEdges.NoTop}>
      <ProjectHeader.CreateProject onClose={() => navigation.goBack()} />

      <ProjectDetails
        autoFocus
        initialColorId={oneOf(PROJECT_COLORS).id}
        initialWantsAttachments
        initialWantsManual
        initialWantsWorklog
        onProjectSave={onProjectSave}
        saveButtonIcon={{ family: "Feather", name: "plus" }}
        saveButtonText={t`Create project`}
      />
    </SafeArea>
  );
};
