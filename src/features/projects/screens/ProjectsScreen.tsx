import { Button } from "@app/core/components/Button";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { ProjectsList } from "@app/features/projects/components/ProjectsList";
import { Dialog } from "@app/features/projects/components/dialogs";
import { t } from "@lingui/macro";
import { SafeAreaViewEdges } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/headers";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FREE_VERSION_PROJECTS_LIMIT = 3;

export const ProjectsScreen = ({ navigation }: RootScreenProps<"projects">) => {
  const setSelectedTagIds = useSetAtom(atoms.selectedTagIds);
  const projects = useAtomValue(atoms.projects);
  const [isProjectLimitDialogOpen, setIsProjectLimitDialogOpen] =
    useState(false);
  const { bottom } = useSafeAreaInsets();

  const onCreateProjectPress = useCallback(() => {
    if (
      projects.length >=
      FREE_VERSION_PROJECTS_LIMIT /* TODO: and has not purchased the app already */
    ) {
      setIsProjectLimitDialogOpen(true);
      return;
    }

    setSelectedTagIds([]);
    navigation.navigate("createProject");
  }, [projects]);

  return (
    <SafeArea edges={SafeAreaViewEdges.NoBottom}>
      <ProjectHeader.Projects
        onSettingsPress={() => navigation.navigate("settings")}
      />

      <ProjectsList
        onEditProjectPress={async (project) => {
          await setSelectedTagIds(project.tagIds);
          navigation.navigate("editProject", { projectId: project.id });
        }}
        onToolPress={(tool, project) => {
          switch (tool) {
            case "attachments":
              navigation.navigate("attachments", { projectId: project.id });
              break;
            case "manual":
              navigation.navigate("manual", { projectId: project.id });
              break;
            case "worklog":
              navigation.navigate("worklog", { projectId: project.id });
              break;
          }
        }}
        projects={projects}
      />

      <Button
        icon={{ family: "Feather", name: "plus" }}
        onPress={onCreateProjectPress}
        style={[tw`absolute mb-4 left-0, right-0 shadow-lg`, { bottom }]}
        text={t`Create new project`}
      />

      <Dialog.ProjectsLimitReached
        isVisible={isProjectLimitDialogOpen}
        onClose={() => setIsProjectLimitDialogOpen(false)}
        onPurchaseAppPress={() => {
          setIsProjectLimitDialogOpen(false);
          navigation.navigate("purchase");
        }}
      />
    </SafeArea>
  );
};
