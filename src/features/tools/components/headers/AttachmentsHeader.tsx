import { Header } from "@app/core/components/Header";
import { useLingui } from "@lingui/react/macro";
import { OnPress } from "@madeja-studio/telar";

interface Props {
  onClose: OnPress;
}

export const AttachmentsHeader = ({ onClose }: Props) => {
  const { t } = useLingui();

  return (
    <Header
      hasBackButton
      onBackPress={onClose}
      style={tw`mt-4`}
      title={t`Attachments`}
    />
  );
};
