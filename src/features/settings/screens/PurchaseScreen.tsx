import { Button } from "@app/core/components/Button";
import { RootScreenProps } from "@app/core/navigation/routes";
import { Header } from "@app/features/settings/components/headers";
import Illustration from "@assets/img/illustration.svg";
import { t } from "@lingui/macro";
import {
  Center,
  Column,
  SafeAreaView,
  SafeAreaViewEdges,
} from "@madeja-studio/telar";
import { Text } from "react-native";

export const PurchaseScreen = ({ navigation }: RootScreenProps<"purchase">) => {
  return (
    <SafeAreaView edges={SafeAreaViewEdges.NoTop}>
      <Header.Purchase onClose={() => navigation.goBack()} />

      <Column style={tw`flex-1 px-8`}>
        <Column style={tw`flex-1 center`}>
          <Text style={tw`h2`}>{t`Why buy the app?`}</Text>
          <Text style={tw`body mt-2`}>{t`The app for you, forever`}</Text>
          <Text style={tw`body mt-2`}>{t`unlimited projects`}</Text>
          <Text style={tw`body mt-2`}>{t`Styles for your manuals`}</Text>
          <Text style={tw`body mt-2`}>{t`Future updates`}</Text>
          <Center style={tw`my-4`}>
            <Illustration />
          </Center>
          <Text style={tw`h2`}>{t`Why 6.99?`}</Text>
          <Text
            style={tw`body mt-2 text-center`}
          >{t`Let's be honest: We went to a store to see how much a personalized project notebook costs, and this was the price. That's it.`}</Text>
        </Column>

        <Button
          icon={{ family: "Feather", name: "shopping-bag" }}
          text={t`6.99`}
        />
      </Column>
    </SafeAreaView>
  );
};
