import { Validation } from "@app/core/types/result";
import { dirname } from "@app/core/utils/mediaFile";
import { Project } from "@app/domain/project";
import * as cheerio from "cheerio";
import * as FileSystem from "expo-file-system";
import { CloudStorage } from "react-native-cloud-storage";

const CLOUD_BACKUP_FILE_PATH = "/dim.projects.json";
const CLOUD_ASSETS_BACKUP_FOLDER_PATH = "/assets";

interface ProjectAsset {
  assetPath: string;
  projectId: string;
}

/**
 * Extracts asset information from HTML content.
 *
 * This function parses the provided HTML, searches for <img> tags,
 * and extracts asset file names from the `data-file-name` attribute.
 * Each asset is associated with a given `projectId`.
 *
 * @param html Optional HTML string to parse. If not provided, an empty array is returned.
 * @param projectId Identifier for the project to associate with the extracted assets.
 * @returns An array of objects containing the `assetPath` (file name) and `projectId`.
 */
const findAssetsInHtml = ({
  html,
  projectId,
}: {
  html?: string;
  projectId: string;
}) => {
  if (!html) return [];

  const $ = cheerio.load(html);
  const $imgs = $("img");

  return $imgs.map((_, $img) => {
    const fileName = $img.attribs["data-file-name"];
    return { assetPath: fileName, projectId: projectId };
  });
};

/**
 * Extracts and collects asset information from a list of projects.
 *
 * This function iterates through an array of projects and looks for assets in
 * all its tools.
 *
 * The function returns an array of objects, each representing an asset with its path and associated project ID.
 *
 * @param project The array of projects to search for assets.
 * @returns An array of extracted assets containing asset paths and their corresponding project IDs.
 */
const findAssets = (project: Project[]): ProjectAsset[] => {
  return project.flatMap((project) => {
    const attachmentAssets =
      project.attachments?.items.map((item) => ({
        assetPath: item.path,
        projectId: project.id,
      })) ?? [];

    const manualAssets = findAssetsInHtml({
      html: project.manual?.contentHtml,
      projectId: project.id,
    });
    const worklogAssets = findAssetsInHtml({
      html: project.worklog?.contentHtml,
      projectId: project.id,
    });

    return [...attachmentAssets, ...manualAssets, ...worklogAssets];
  });
};

/**
 * Validates the existence and completeness of a backup in cloud storage.
 *
 * This function checks if a backup file exists in the provided cloud storage.
 * If the backup is found, it verifies that all related assets referenced in the
 * backup file are also present. Returns a validation object indicating success
 * or specific error reasons.
 *
 * Error reasons:
 * - "no_backup": Indicates that no backup file is present.
 * - "assets_missing": Indicates that one or more assets referenced in the backup file are missing.
 *
 * @param cloudStorage - An object representing the cloud storage interface, used to read and check the existence of files.
 * @returns A promise resolving to a validation object with either a success flag or an error describing the issue.
 */
export const validateBackup = async ({
  cloudStorage,
}: {
  cloudStorage: CloudStorage;
}): Promise<Validation<"assets_missing" | "no_backup">> => {
  const backupExists = await existsBackupFile({ cloudStorage });
  if (!backupExists) return { error: "no_backup", success: false };

  const rawProjects = await cloudStorage.readFile(CLOUD_BACKUP_FILE_PATH);
  const projects = JSON.parse(rawProjects);

  const assets = findAssets(projects);
  const assetIsPresent = await Promise.all(
    assets.map(async ({ assetPath, projectId }) => {
      const cloudAssetPath = `${CLOUD_ASSETS_BACKUP_FOLDER_PATH}/${projectId}/${assetPath}`;
      return await cloudStorage.exists(cloudAssetPath);
    })
  );

  if (assetIsPresent.includes(false)) {
    return { error: "assets_missing", success: false };
  }

  return { success: true };
};

/**
 * Asynchronously stores project data in a cloud storage backup file.
 *
 * This function takes in a `cloudStorage` object and an array of `projects`,
 * converts the projects data to JSON format, and writes it to a predefined
 * backup file path in the provided cloud storage.
 *
 * @param cloudStorage - The cloud storage instance used to write the backup.
 * @param projects - An array of project objects to be included in the backup.
 */
export const storeInBackup = async ({
  cloudStorage,
  projects,
}: {
  cloudStorage: CloudStorage;
  projects: Project[];
}) => {
  const jsonProjects = JSON.stringify(projects);
  const assets = findAssets(projects);

  await Promise.all(
    assets.map(async ({ assetPath, projectId }) => {
      const cloudAssetPath = `${CLOUD_ASSETS_BACKUP_FOLDER_PATH}/${projectId}/${assetPath}`;
      const localAssetPath = `${FileSystem.documentDirectory}${assetPath}`;

      const existsAlready = await cloudStorage.exists(cloudAssetPath);
      if (existsAlready) {
        return;
      }

      const base64Data = await FileSystem.readAsStringAsync(localAssetPath, {
        encoding: "base64",
      });

      await cloudStorage.mkdir(dirname(cloudAssetPath));
      await cloudStorage.writeFile(cloudAssetPath, base64Data);
    })
  );

  await cloudStorage.writeFile(CLOUD_BACKUP_FILE_PATH, jsonProjects);
};

/**
 * Loads project data from a backup file stored in cloud storage.
 * This function reads the backup file content at the specified path within
 * the cloud storage, parses the content, and returns the parsed data.
 *
 * @param cloudStorage - The instance of the cloud storage service used to read the backup file.
 * @returns The parsed project data from the backup file.
 */
export const loadFromBackup = async ({
  cloudStorage,
}: {
  cloudStorage: CloudStorage;
}) => {
  const rawProjects = await cloudStorage.readFile(CLOUD_BACKUP_FILE_PATH);
  const projects = JSON.parse(rawProjects);

  const assets = findAssets(projects);
  await Promise.all(
    assets.map(async ({ assetPath, projectId }) => {
      const cloudAssetPath = `${CLOUD_ASSETS_BACKUP_FOLDER_PATH}/${projectId}/${assetPath}`;
      const localAssetPath = `${FileSystem.documentDirectory}${assetPath}`;

      const base64 = await cloudStorage.readFile(cloudAssetPath);
      await FileSystem.makeDirectoryAsync(dirname(localAssetPath), {
        intermediates: true,
      });
      await FileSystem.writeAsStringAsync(localAssetPath, base64, {
        encoding: "base64",
      });
    })
  );

  return projects;
};

/**
 * Checks if the backup file exists in the cloud storage.
 *
 * This function verifies the presence of a predefined backup file path
 * in the provided cloud storage by using its `exists` method.
 *
 * @param cloudStorage - The cloud storage instance to check for the backup file.
 * @returns A promise that resolves to a boolean indicating whether the backup file exists.
 */
export const existsBackupFile = async ({
  cloudStorage,
}: {
  cloudStorage: CloudStorage;
}) => cloudStorage.exists(CLOUD_BACKUP_FILE_PATH);
