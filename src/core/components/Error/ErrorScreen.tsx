import { Button } from "@app/core/components/Button";
import { t } from "@lingui/macro";
import { Column, SafeAreaView } from "@madeja-studio/telar";
import Constants from "expo-constants";
import { Text } from "react-native";

interface Props {
  error: Error;
  resetError: Function;
}

export const ErrorScreen = ({ error, resetError }: Props) => {
  return (
    <SafeAreaView style={tw`flex-1 justify-between px-4`}>
      <Column style={tw`flex-1`}>
        <Text style={tw`h1`}>{t`Something went wrong`}</Text>
        <Text
          style={tw`body mt-2`}
        >{t`We are sorry but it looks like something failed. Send us an email to hola@serchinastico.com and we will work on it.`}</Text>

        {Constants.debugMode && (
          <Text style={tw`body mt-4`}>{error.message}</Text>
        )}
      </Column>

      <Button hasHapticFeedback onPress={() => resetError()} text={t`Reset`} />
    </SafeAreaView>
  );
};
