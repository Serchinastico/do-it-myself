import { Button } from "@app/core/components/Button";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { ProjectsList } from "@app/features/projects/components/ProjectsList";
import { t } from "@lingui/macro";
import { SafeAreaView, SafeAreaViewEdges } from "@madeja-studio/telar";
import { StatusBar } from "expo-status-bar";
import { ProjectHeader } from "features/projects/components/headers";
import { useAtomValue, useSetAtom } from "jotai";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ProjectsScreen = ({ navigation }: RootScreenProps<"projects">) => {
  const setSelectedTagIds = useSetAtom(atoms.selectedTagIds);
  const projects = useAtomValue(atoms.projects);
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView edges={SafeAreaViewEdges.NoBottom} style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ProjectHeader.Projects />

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
              break;
          }
        }}
        projects={projects}
      />

      <Button
        icon={{ family: "Feather", name: "plus" }}
        onPress={() => {
          setSelectedTagIds([]);
          navigation.navigate("createProject");
        }}
        style={[tw`absolute mb-4 left-0, right-0 shadow-lg`, { bottom }]}
        text={t`Create new project`}
      />
    </SafeAreaView>
  );
};
