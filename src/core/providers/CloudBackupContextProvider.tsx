import { CloudBackupFileAlreadyExistsDialog } from "@app/core/components/CloudBackupFileAlreadyExistsDialog";
import { atoms } from "@app/core/storage/state";
import { CloudBackupProvider as Provider } from "@app/domain/cloudBackup";
import { t } from "@lingui/macro";
import { useToast } from "@madeja-studio/telar";
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
  setProvider: (provider: Provider) => void;
}

const CloudBackupContext = createContext<ContextProps>({} as ContextProps);

export const CloudBackupContextProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useAtom(atoms.projects);
  const [provider, setProviderAtom] = useAtom(atoms.cloudBackupProvider);
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
      showToast({
        subtitle: t`There is a problem with your cloud storage provider. Cloud backups have been disabled.`,
        title: t`Unable to store backup`,
        variant: "error",
      });
      setProviderAtom(false);
      return;
    }

    const jsonProjects = JSON.stringify(projects);
    await cloudStorage.writeFile(CLOUD_BACKUP_FILE_PATH, jsonProjects);
  }, [projects, cloudStorage, showToast]);

  const setProvider = useCallback(
    async (provider: Provider) => {
      if (!provider) {
        setProviderAtom(false);
        return;
      }

      const storage = new CloudStorage(
        provider === "icloud"
          ? CloudStorageProvider.ICloud
          : CloudStorageProvider.GoogleDrive
      );
      setCloudStorage(storage);
      setSelectedProvider(provider);

      const isAvailable = await storage.isCloudAvailable();
      if (!isAvailable) {
        showToast({
          subtitle: t`There is a problem with your cloud storage provider. Cloud backups have been disabled.`,
          title: t`Unable to store backup`,
          variant: "error",
        });
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
    [showToast]
  );

  const onDeleteBackup = useCallback(async () => {
    await cloudStorage.rmdir(CLOUD_BACKUP_FILE_PATH);
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
