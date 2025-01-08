import { BaseOnboardingPage } from "@app/features/onboarding/components/pages/BaseOnboardingPage";
import { t } from "@lingui/core/macro";

const OnboardingPage3 = () => {
  return (
    <BaseOnboardingPage
      description={t`Your data is yours: store your backups securely with iCloud or Google Drive.`}
      illustrationName={"settings"}
      key="page-3"
      title={t`Your app\nYour data`}
    />
  );
};

export default OnboardingPage3;
