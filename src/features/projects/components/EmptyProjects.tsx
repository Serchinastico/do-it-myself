import { Illustration } from "@app/core/components/Illustration";
import { t } from "@lingui/macro";
import { Column } from "@madeja-studio/telar";
import { Text } from "react-native";

export const EmptyProjects = () => {
  return (
    <Column style={tw`flex-1 center mb-28 px-12`}>
      <Illustration heightWindowRatio="1/3" name="not_found" />

      <Text style={tw`h2 mt-6`}>{t`No projects yet`}</Text>
      <Text
        style={tw`body text-center mt-4`}
      >{t`It’s time to create a project and start doing things.`}</Text>
      <Text
        style={tw`body text-center font-bold text-white bg-primary px-4 py-2 mt-4`}
      >{t`Create a new project to get going.`}</Text>
    </Column>
  );
};
