import { Button } from "@app/core/components/Button";
import { SafeArea } from "@app/core/components/SafeArea";
import { useColorSchemeKey } from "@app/core/hooks/useColorSchemeKey";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { Dialog } from "@app/features/projects/components/dialogs";
import { ProjectsList } from "@app/features/projects/components/ProjectsList";
import { useLingui } from "@lingui/react/macro";
import { SafeAreaViewEdges } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/headers";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FREE_VERSION_PROJECTS_LIMIT = 3;

export const ProjectsScreen = ({ navigation }: RootScreenProps<"projects">) => {
  const setSelectedTagIds = useSetAtom(atoms.selectedTagIds);
  const projects = useAtomValue(atoms.projects);
  const hasPurchasedApp = useAtomValue(atoms.hasPurchasedApp);
  const [isProjectLimitDialogOpen, setIsProjectLimitDialogOpen] =
    useState(false);
  const { bottom } = useSafeAreaInsets();
  const colorSchemeKey = useColorSchemeKey();
  const [scroll, setScroll] = useState(0);
  const { t } = useLingui();

  const onCreateProjectPress = useCallback(() => {
    if (projects.length >= FREE_VERSION_PROJECTS_LIMIT && !hasPurchasedApp) {
      setIsProjectLimitDialogOpen(true);
      return;
    }

    setSelectedTagIds([]);
    navigation.navigate("createProject");
  }, [projects, hasPurchasedApp]);

  return (
    <SafeArea edges={SafeAreaViewEdges.NoBottom} key={colorSchemeKey}>
      <ProjectHeader.Projects
        onSettingsPress={() => navigation.navigate("settings")}
        scrollOffset={scroll}
      />

      <ProjectsList
        onCreatePress={onCreateProjectPress}
        onEditProjectPress={async (project) => {
          await setSelectedTagIds(project.tagIds);
          navigation.navigate("editProject", { projectId: project.id });
        }}
        onScroll={setScroll}
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
