import { CreateProjectHeader } from "@app/features/projects/components/CreateProjectHeader";
import { t } from "@lingui/macro";
import { Button, SafeAreaView, SafeAreaViewEdges } from "@madeja-studio/telar";
import { StatusBar } from "react-native";

export const CreateProjectScreen = () => {
  return (
    <SafeAreaView edges={SafeAreaViewEdges.NoTop}>
      <StatusBar barStyle="dark-content" />

      <CreateProjectHeader />

      <Button
        hasHapticFeedback
        icon={{ family: "Feather", name: "plus" }}
        style={tw`center`}
        text={t`Create project`}
      />
    </SafeAreaView>
  );
};
