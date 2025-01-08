import { Button } from "@app/core/components/Button";
import { Dialog } from "@app/core/components/Dialog";
import { Illustration } from "@app/core/components/Illustration";
import { CloudBackupProvider } from "@app/domain/cloudBackup";
import { t } from "@lingui/core/macro";
import { Center, Column, OnPress, Row } from "@madeja-studio/telar";
import { ComponentProps } from "react";
import { Text } from "react-native";

interface Props extends ComponentProps<typeof Dialog> {
  onDeleteBackup: OnPress;
  onLoadBackup: OnPress;
  provider: CloudBackupProvider;
}

export const CloudBackupFileAlreadyExistsDialog = ({
  isVisible,
  onClose,
  onDeleteBackup,
  onLoadBackup,
  provider,
}: Props) => {
  return (
    <Dialog isVisible={isVisible} onClose={onClose}>
      <Column>
        <Center style={tw`mt-8`}>
          <Illustration heightWindowRatio="1/4" name="backup_conflict" />
        </Center>

        <Text style={tw`h1 mt-4`}>{t`You already have a backup!`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`We found a backup file in your ${provider === "gcloud" ? "Google Cloud" : "iCloud"} account. You can overwrite it, or you can load it up, deleting your current projects.`}</Text>
        <Text
          style={tw`body mt-4`}
        >{t`Or you can make as if nothing happened and cancel the backup entirely. We won't tell anyone.`}</Text>
        <Row style={tw`center gap-4 mt-6`}>
          <Button
            icon={{ family: "Feather", name: "upload" }}
            onPress={onDeleteBackup}
            text={t`Overwrite`}
            variant="outlined"
          />
          <Button
            icon={{ family: "Feather", name: "download" }}
            onPress={onLoadBackup}
            text={t`Load`}
            variant="contained"
          />
        </Row>
      </Column>
    </Dialog>
  );
};
