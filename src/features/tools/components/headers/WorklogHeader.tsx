import { Header } from "@app/core/components/Header";
import { useLingui } from "@lingui/react/macro";
import { OnPress } from "@madeja-studio/telar";

interface Props {
  onBackPress: OnPress;
}

export const WorklogHeader = ({ onBackPress }: Props) => {
  const { t } = useLingui();

  return (
    <Header
      hasBackButton
      onBackPress={onBackPress}
      style={tw`mt-4`}
      title={t`Worklog`}
    />
  );
};
