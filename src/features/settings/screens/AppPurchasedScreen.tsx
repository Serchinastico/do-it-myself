import { Button } from "@app/core/components/Button";
import { Illustration } from "@app/core/components/Illustration";
import { SafeArea } from "@app/core/components/SafeArea";
import { RootScreenProps } from "@app/core/navigation/routes";
import { Header } from "@app/features/settings/components/headers";
import { PartyAnimation } from "@app/features/settings/components/PartyAnimation";
import { t } from "@lingui/macro";
import { Center, Column, SafeAreaViewEdges } from "@madeja-studio/telar";
import { Linking, Text } from "react-native";

export const AppPurchasedScreen = ({
  navigation,
}: RootScreenProps<"appPurchased">) => {
  return (
    <SafeArea edges={SafeAreaViewEdges.NoTop}>
      <Header.AppPurchased onClose={() => navigation.goBack()} />

      <Column style={tw`flex-1 px-8`}>
        <Column style={tw`flex-1 center`}>
          <Text
            style={tw`h2 text-center`}
          >{t`Thank you for purchasing Do It Myself!`}</Text>
          <Text
            style={tw`body mt-2`}
          >{t`You can now enjoy the app, forever`}</Text>
          <Center style={tw`my-4`}>
            <Illustration heightWindowRatio="1/5" name="app_purchased" />
          </Center>
          <Text style={tw`h2`}>{t`Any suggestion?`}</Text>
          <Text style={tw`body mt-2 text-center`}>
            {t`If you find any problem with the app or just want to help making
              it better, send me an email.`}
          </Text>

          <Button
            onPress={() => Linking.openURL("mailto:dim@serchinastico.com")}
            text="dim@serchinastico.com"
            textStyle={tw`font-bold`}
            variant="text"
          />
        </Column>

        <Button onPress={() => navigation.goBack()} text={t`Accept`} />

        <PartyAnimation />
      </Column>
    </SafeArea>
  );
};
