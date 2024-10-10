import { Header } from "@app/core/components/Header";
import { t } from "@lingui/macro";
import { OnPress } from "@madeja-studio/telar";

interface Props {
  onBackPress: OnPress;
}

export const WorklogHeader = ({ onBackPress }: Props) => {
  return (
    <Header
      hasBackButton
      onBackPress={onBackPress}
      style={tw`mt-4`}
      title={t`Worklog`}
    />
  );
};
