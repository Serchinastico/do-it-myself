import { Header as GenericHeader } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { Button } from "@madeja-studio/telar";

export const Header = () => {
  return (
    <GenericHeader title={t`Projects`}>
      <Button.Icon
        color="secondary"
        icon={{ family: "Feather", name: "user" }}
        variant="text"
      />
    </GenericHeader>
  );
};
