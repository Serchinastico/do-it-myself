import { t } from "@lingui/macro";
import { Column } from "@madeja-studio/telar";
import { Text } from "react-native";

export const EmptyProjects = () => {
  return (
    <Column style={tw`flex-1 center px-10 gap-2`}>
      <Text style={tw`text-h2 font-bold`}>{t`No projects yet`}</Text>
      <Text
        style={tw`text-body text-center`}
      >{t`It’s time to create a project and start doing things.`}</Text>
      <Text
        style={tw`text-body text-center font-bold text-white bg-primary px-4 py-2`}
      >{t` Create a new project to get going.`}</Text>
    </Column>
  );
};
