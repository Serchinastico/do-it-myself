import { Button } from "@app/core/components/Button";
import { RootScreenProps } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { EmptyProjects } from "@app/features/projects/components/EmptyProjects";
import { t } from "@lingui/macro";
import { SafeAreaView } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
import { useSetAtom } from "jotai";
import { StatusBar } from "react-native";

export const ProjectsScreen = ({ navigation }: RootScreenProps<"projects">) => {
  const setSelectedTagIds = useSetAtom(atoms.selectedTagIds);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <ProjectHeader.Projects />

      <EmptyProjects />

      <Button
        icon={{ family: "Feather", name: "plus" }}
        onPress={() => {
          setSelectedTagIds([]);
          navigation.navigate("createProject");
        }}
        text={t`Create new project`}
      />
    </SafeAreaView>
  );
};
