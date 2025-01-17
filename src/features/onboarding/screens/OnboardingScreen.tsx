import { Button } from "@app/core/components/Button";
import PageIndicator from "@app/core/components/PageIndicator";
import { SafeArea } from "@app/core/components/SafeArea";
import { useRootNavigation } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { t } from "@lingui/core/macro";
import { StatusBar } from "expo-status-bar";
import { useSetAtom } from "jotai";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";

import OnboardingPages from "../components/pages";

const OnboardingScreen = () => {
  const [page, setPage] = useState(0);
  const navigation = useRootNavigation();
  const setHasSeenOnboarding = useSetAtom(atoms.hasSeenOnboarding);

  const onSkipOnboarding = useCallback(() => {
    setHasSeenOnboarding(true);
    navigation.replace("projects");
  }, []);

  return (
    <SafeArea>
      <StatusBar style="dark" />

      <PagerView
        onPageSelected={(event) => setPage(event.nativeEvent.position)}
        style={tw`flex-1`}
      >
        <OnboardingPages.Page1 />
        <OnboardingPages.Page2 />
        <OnboardingPages.Page3 />
      </PagerView>

      <View style={tw`py-2 center mb-4`}>
        <PageIndicator numberOfPages={3} page={page} />
      </View>

      <Button
        onPress={onSkipOnboarding}
        style={tw`mb-2`}
        text={t`Get started`}
      />
    </SafeArea>
  );
};

export default OnboardingScreen;
