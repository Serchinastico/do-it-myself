import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { PROJECT_COLORS } from "@app/domain/project";
import { EditedProject } from "@app/domain/project/project";
import { ProjectDetails } from "@app/features/projects/components/ProjectDetails";
import { t } from "@lingui/macro";
import { oneOf, randomId } from "@madeja-studio/cepillo";
import { ProjectHeader } from "features/projects/components/headers";
import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { StatusBar, View } from "react-native";

export const CreateProjectScreen = ({
  navigation,
}: RootScreenProps<"createProject">) => {
  const setProjects = useSetAtom(atoms.projects);

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
    <View style={tw`bg-white android:mt-4 flex-1`}>
      <StatusBar barStyle="dark-content" />

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
    </View>
  );
};
