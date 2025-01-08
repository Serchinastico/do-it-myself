import { BaseOnboardingPage } from "@app/features/onboarding/components/pages/BaseOnboardingPage";
import { t } from "@lingui/core/macro";

const OnboardingPage2 = () => {
  return (
    <BaseOnboardingPage
      description={t`Worklogs, manuals and attachments at your fingertips, you'll have everything you need to keep track of your progress.`}
      illustrationName={"confirmation"}
      key="page-2"
      title={t`Tools to track your progress`}
    />
  );
};

export default OnboardingPage2;
