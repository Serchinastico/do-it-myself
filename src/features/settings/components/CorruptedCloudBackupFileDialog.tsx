import { Button } from "@app/core/components/Button";
import { Dialog } from "@app/core/components/Dialog";
import { Illustration } from "@app/core/components/Illustration";
import { CloudBackupProvider } from "@app/domain/cloudBackup";
import { useLingui } from "@lingui/react/macro";
import { Center, Column, OnPress, Row } from "@madeja-studio/telar";
import { ComponentProps } from "react";
import { Text } from "react-native";

interface Props extends ComponentProps<typeof Dialog> {
  onDeleteBackup: OnPress;
  provider: CloudBackupProvider;
}

export const CorruptedCloudBackupFileDialog = ({
  isVisible,
  onClose,
  onDeleteBackup,
  provider,
}: Props) => {
  const { t } = useLingui();

  return (
    <Dialog isVisible={isVisible} onClose={onClose}>
      <Column>
        <Center style={tw`mt-8`}>
          <Illustration heightWindowRatio="1/4" name="backup_conflict" />
        </Center>

        <Text style={tw`h1 mt-4`}>{t`You have a corrupted backup`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`We found a backup file in your ${provider === "gcloud" ? "Google Cloud" : "iCloud"} account. However, we noticed it's corrupted and we can't seem to recover it.`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`You can overwrite it with this device's data or you can leave cloud backups for later.`}</Text>
        <Row style={tw`center gap-4 mt-6`}>
          <Button
            hasAutoLoad
            icon={{ family: "Feather", name: "upload" }}
            onPress={onDeleteBackup}
            text={t`Overwrite`}
            variant="contained"
          />
        </Row>
      </Column>
    </Dialog>
  );
};
