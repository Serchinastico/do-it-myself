import { Button } from "@app/core/components/Button";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { color } from "@app/core/theme/color";
import { ProjectsList } from "@app/features/projects/components/ProjectsList";
import { t } from "@lingui/macro";
import { SafeAreaView } from "@madeja-studio/telar";
import { StatusBar } from "expo-status-bar";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
import { useAtomValue, useSetAtom } from "jotai";

export const ProjectsScreen = ({ navigation }: RootScreenProps<"projects">) => {
  const setSelectedTagIds = useSetAtom(atoms.selectedTagIds);
  const projects = useAtomValue(atoms.projects);

  return (
    <SafeAreaView style={tw`bg-white`}>
      <StatusBar backgroundColor={color.white} style="dark" />

      <ProjectHeader.Projects />

      <ProjectsList
        onEditProjectPress={async (project) => {
          await setSelectedTagIds(project.tagIds);
          navigation.navigate("editProject", { projectId: project.id });
        }}
        projects={projects}
      />

      <Button
        icon={{ family: "Feather", name: "plus" }}
        onPress={() => {
          setSelectedTagIds([]);
          navigation.navigate("createProject");
        }}
        style={tw`mb-4`}
        text={t`Create new project`}
      />
    </SafeAreaView>
  );
};
