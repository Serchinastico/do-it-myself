import { Header } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { Button } from "@madeja-studio/telar";
import { View } from "react-native";

export const ProjectsScreen = () => {
  return (
    <View>
      <Header title={t`Projects`}>
        <Button.Icon icon={{ family: "Feather", name: "user" }} />
      </Header>
    </View>
  );
};
