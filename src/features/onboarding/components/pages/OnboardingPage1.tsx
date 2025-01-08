import { BaseOnboardingPage } from "@app/features/onboarding/components/pages/BaseOnboardingPage";
import { t } from "@lingui/core/macro";

const OnboardingPage1 = () => {
  return (
    <BaseOnboardingPage
      description={t`Name them, tag them, search through your collection, and never lose track of a project again.`}
      illustrationName={"app_purchased"}
      key="page-1"
      title={t`Keep your DIY projects well organized`}
    />
  );
};

export default OnboardingPage1;
