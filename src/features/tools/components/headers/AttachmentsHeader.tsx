import { Header } from "@app/core/components/Header";
import { t } from "@lingui/core/macro";
import { OnPress } from "@madeja-studio/telar";

interface Props {
  onClose: OnPress;
}

export const AttachmentsHeader = ({ onClose }: Props) => {
  return (
    <Header
      hasBackButton
      onBackPress={onClose}
      style={tw`mt-4`}
      title={t`Attachments`}
    />
  );
};
