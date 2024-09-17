import { EmptyProjects } from "@app/features/projects/components/EmptyProjects";
import { t } from "@lingui/macro";
import { Button, SafeAreaView } from "@madeja-studio/telar";
import { StatusBar } from "react-native";

import { Header } from "./components/Header";

export const ProjectsScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />

      <Header />

      <EmptyProjects />

      <Button
        hasHapticFeedback
        icon={{ family: "Feather", name: "plus" }}
        style={tw`center`}
        text={t`Create new project`}
      />
    </SafeAreaView>
  );
};
