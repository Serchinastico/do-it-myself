import { Header } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { Button } from "@madeja-studio/telar";

export const ProjectsHeader = () => {
  return (
    <Header title={t`Projects`}>
      <Button.Icon
        color="secondary"
        icon={{ family: "Feather", name: "user" }}
        variant="text"
      />
    </Header>
  );
};
