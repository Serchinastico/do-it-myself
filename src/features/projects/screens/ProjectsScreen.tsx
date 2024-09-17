import { RootScreenProps } from "@app/core/navigation/routes";
import { EmptyProjects } from "@app/features/projects/components/EmptyProjects";
import { t } from "@lingui/macro";
import { Button, SafeAreaView } from "@madeja-studio/telar";
import { ProjectHeader } from "features/projects/components/ProjectHeader";
import { StatusBar } from "react-native";

export const ProjectsScreen = ({ navigation }: RootScreenProps<"projects">) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <ProjectHeader.Projects />

      <EmptyProjects />

      <Button
        hasHapticFeedback
        icon={{ family: "Feather", name: "plus" }}
        onPress={() => navigation.navigate("createProject")}
        style={tw`center`}
        text={t`Create new project`}
      />
    </SafeAreaView>
  );
};
