import { atoms } from "@app/core/storage/state";
import {
  existsBackupFile,
  loadFromBackup,
  storeInBackup,
  validateBackup,
} from "@app/core/utils/cloudBackup";
import { CloudBackupProvider as Provider } from "@app/domain/cloudBackup";
import { CloudBackupFileAlreadyExistsDialog } from "@app/features/settings/components/CloudBackupFileAlreadyExistsDialog";
import { CorruptedCloudBackupFileDialog } from "@app/features/settings/components/CorruptedCloudBackupFileDialog";
import { i18n } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import { useToast } from "@madeja-studio/telar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAtom } from "jotai";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { CloudStorage, CloudStorageProvider } from "react-native-cloud-storage";
import useAsyncEffect from "use-async-effect";

interface ContextProps {
  provider: Provider;
  setProvider: (provider: Provider) => Promise<void>;
}

const CloudBackupContext = createContext<ContextProps>({} as ContextProps);

const getCloudStorageErrorToastProps = () =>
  ({
    subtitle: i18n._(
      `There is a problem with your cloud storage provider. Cloud backups have been disabled.`
    ),
    title: i18n._(`Unable to store backup`),
    variant: "error",
  }) as const;

export const CloudBackupContextProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useAtom(atoms.projects);
  const [provider, setProviderAtom] = useAtom(atoms.cloudBackupProvider);
  const [googleCloudToken, setGoogleCloudToken] = useAtom(
    atoms.googleCloudToken
  );
  const [selectedProvider, setSelectedProvider] = useState(provider);
  const { showToast } = useToast();
  const { t } = useLingui();
  const [cloudStorage, setCloudStorage] = useState<CloudStorage>(
    CloudStorage.getDefaultInstance()
  );
  const [isShowingOverwriteDialog, setIsShowingOverwriteDialog] =
    useState(false);
  const [isShowingCorruptedDialog, setIsShowingCorruptedDialog] =
    useState(false);

  useAsyncEffect(async () => {
    if (!provider) return;

    const isAvailable = await cloudStorage.isCloudAvailable();
    if (!isAvailable) {
      showToast(getCloudStorageErrorToastProps());
      setProviderAtom(false);
      return;
    }

    await storeInBackup({ cloudStorage, projects });
  }, [projects, cloudStorage, showToast]);

  const createCloudStorageForProvider = useCallback(
    async (provider: Provider) => {
      switch (provider) {
        case "gcloud": {
          if (!googleCloudToken) {
            const response = await GoogleSignin.signIn();
            if (response.type === "success" && response.data.idToken) {
              const tokens = await GoogleSignin.getTokens();
              setGoogleCloudToken(tokens.accessToken);

              return new CloudStorage(CloudStorageProvider.GoogleDrive, {
                accessToken: tokens.accessToken,
              });
            } else {
              return null;
            }
          } else {
            return new CloudStorage(CloudStorageProvider.GoogleDrive, {
              accessToken: googleCloudToken,
            });
          }
        }
        case "icloud":
          return new CloudStorage(CloudStorageProvider.ICloud);
      }
    },
    [googleCloudToken]
  );

  const setProvider = useCallback(
    async (provider: Provider) => {
      if (!provider) {
        setProviderAtom(false);
        return;
      }

      const storage = await createCloudStorageForProvider(provider);

      if (!storage) {
        showToast(getCloudStorageErrorToastProps());
        setProviderAtom(false);
        return;
      }

      setCloudStorage(storage);
      setSelectedProvider(provider);

      const isAvailable = await storage.isCloudAvailable();
      if (!isAvailable) {
        showToast(getCloudStorageErrorToastProps());
        setGoogleCloudToken(null);
        setProviderAtom(false);
        return;
      }

      const existsPreviousBackup = await existsBackupFile({
        cloudStorage: storage,
      });
      if (existsPreviousBackup) {
        const backupValidation = await validateBackup({
          cloudStorage: storage,
        });

        if (backupValidation.success) {
          setIsShowingOverwriteDialog(true);
        } else {
          setIsShowingCorruptedDialog(true);
        }

        return;
      }

      await storeInBackup({ cloudStorage: storage, projects });

      setProviderAtom(provider);
    },
    [showToast, createCloudStorageForProvider, projects]
  );

  const onDeleteBackup = useCallback(async () => {
    await storeInBackup({ cloudStorage, projects });

    setProviderAtom(selectedProvider);
    setIsShowingOverwriteDialog(false);
    setIsShowingCorruptedDialog(false);
    showToast({
      subtitle: t`Your current projects are now backed up.`,
      title: t`Your remote projects have been deleted.`,
      variant: "success",
    });
  }, [projects, cloudStorage, selectedProvider]);

  const onLoadBackup = useCallback(async () => {
    const projects = await loadFromBackup({ cloudStorage });
    setProjects(projects);

    setProviderAtom(selectedProvider);
    setIsShowingOverwriteDialog(false);
    setIsShowingCorruptedDialog(false);
    showToast({
      subtitle: t`Your remote projects have been loaded and are ready to use.`,
      title: t`Backup loaded`,
      variant: "success",
    });
  }, [cloudStorage, selectedProvider]);

  return (
    <CloudBackupContext.Provider value={{ provider, setProvider }}>
      {children}

      <CloudBackupFileAlreadyExistsDialog
        isVisible={isShowingOverwriteDialog}
        onClose={() => setIsShowingOverwriteDialog(false)}
        onDeleteBackup={onDeleteBackup}
        onLoadBackup={onLoadBackup}
        provider={selectedProvider}
      />

      <CorruptedCloudBackupFileDialog
        isVisible={isShowingCorruptedDialog}
        onClose={() => setIsShowingCorruptedDialog(false)}
        onDeleteBackup={onDeleteBackup}
        provider={selectedProvider}
      />
    </CloudBackupContext.Provider>
  );
};

export const useCloudBackup = () => useContext(CloudBackupContext);
