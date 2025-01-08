import { Button } from "@app/core/components/Button";
import PageIndicator from "@app/core/components/PageIndicator";
import { SafeArea } from "@app/core/components/SafeArea";
import { useRootNavigation } from "@app/core/navigation/routes";
import { atoms } from "@app/core/storage/state";
import { t } from "@lingui/core/macro";
import { AnimatedSwitch } from "@madeja-studio/telar";
import { StatusBar } from "expo-status-bar";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import { useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import OnboardingPages from "../components/pages";

const OnboardingScreen = () => {
  const [page, setPage] = useState(0);
  const { bottom } = useSafeAreaInsets();
  const startButtonOpacity = useSharedValue(0);
  const navigation = useRootNavigation();
  const setHasSeenOnboarding = useSetAtom(atoms.hasSeenOnboarding);

  useEffect(() => {
    if (page === 2) {
      startButtonOpacity.value = 1;
      setHasSeenOnboarding(true);
    } else {
      startButtonOpacity.value = 0;
    }
  }, [page]);

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

      <AnimatedSwitch
        style={tw.style(`absolute h-[60px] center inset-x-0`, {
          bottom: bottom + 16,
        })}
        visibleComponent={page === 2 ? 1 : 0}
      >
        <View style={tw`py-2 center`}>
          <PageIndicator numberOfPages={3} page={page} />
        </View>

        <Button
          icon={{ family: "Feather", name: "arrow-right" }}
          onPress={() => navigation.replace("projects")}
          text={t`Start`}
        />
      </AnimatedSwitch>
    </SafeArea>
  );
};

export default OnboardingScreen;
