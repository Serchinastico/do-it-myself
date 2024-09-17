import { Header } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { Button } from "@madeja-studio/telar";

export const CreateProjectHeader = () => {
  return (
    <Header style={tw`mt-4`} title={t`New project`}>
      <Button.Icon
        color="secondary"
        icon={{ family: "Feather", name: "x" }}
        variant="text"
      />
    </Header>
  );
};
