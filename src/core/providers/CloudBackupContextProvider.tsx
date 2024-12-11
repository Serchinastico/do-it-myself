import { CloudBackupFileAlreadyExistsDialog } from "@app/core/components/CloudBackupFileAlreadyExistsDialog";
import { atoms } from "@app/core/storage/state";
import { CloudBackupProvider as Provider } from "@app/domain/cloudBackup";
import { t } from "@lingui/macro";
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

const CLOUD_BACKUP_FILE_PATH = "/dim.projects.json";

interface ContextProps {
  provider: Provider;
  setProvider: (provider: Provider) => Promise<void>;
}

const CloudBackupContext = createContext<ContextProps>({} as ContextProps);

const getCloudStorageErrorToastProps = () =>
  ({
    subtitle: t`There is a problem with your cloud storage provider. Cloud backups have been disabled.`,
    title: t`Unable to store backup`,
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
  const [cloudStorage, setCloudStorage] = useState<CloudStorage>(
    CloudStorage.getDefaultInstance()
  );
  const [isShowingDialog, setIsShowingDialog] = useState(false);

  useAsyncEffect(async () => {
    if (!provider) return;

    const isAvailable = await cloudStorage.isCloudAvailable();
    if (!isAvailable) {
      showToast(getCloudStorageErrorToastProps());
      setProviderAtom(false);
      return;
    }

    const jsonProjects = JSON.stringify(projects);
    await cloudStorage.writeFile(CLOUD_BACKUP_FILE_PATH, jsonProjects);
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

      const existsPreviousBackup = await storage.exists(CLOUD_BACKUP_FILE_PATH);
      if (existsPreviousBackup) {
        setIsShowingDialog(true);
        return;
      }

      await storage.writeFile(CLOUD_BACKUP_FILE_PATH, JSON.stringify(projects));

      setProviderAtom(provider);
    },
    [showToast, createCloudStorageForProvider, projects]
  );

  const onDeleteBackup = useCallback(async () => {
    await cloudStorage.writeFile(
      CLOUD_BACKUP_FILE_PATH,
      JSON.stringify(projects)
    );

    setProviderAtom(selectedProvider);
    setIsShowingDialog(false);
    showToast({
      subtitle: t`Your current projects are now backed up.`,
      title: t`Your remote projects have been deleted.`,
      variant: "success",
    });
  }, [projects, cloudStorage, selectedProvider]);

  const onLoadBackup = useCallback(async () => {
    const rawProjects = await cloudStorage.readFile(CLOUD_BACKUP_FILE_PATH);
    setProjects(JSON.parse(rawProjects));

    setProviderAtom(selectedProvider);
    setIsShowingDialog(false);
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
        isVisible={isShowingDialog}
        onClose={() => setIsShowingDialog(false)}
        onDeleteBackup={onDeleteBackup}
        onLoadBackup={onLoadBackup}
        provider={selectedProvider}
      />
    </CloudBackupContext.Provider>
  );
};

export const useCloudBackup = () => useContext(CloudBackupContext);
