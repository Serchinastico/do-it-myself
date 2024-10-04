import * as FileSystem from "expo-file-system";
import { PropsWithChildren, useEffect } from "react";

interface Props extends PropsWithChildren {}

/**
 * Logs the file paths as a tree representation.
 * @param filePaths - An array of file paths.
 */
const logFileTree = (filePaths: string[]): void => {
  const tree: { [key: string]: any } = {};

  // Build the tree structure
  filePaths.forEach((filePath) => {
    const parts = filePath.split("/");
    let current = tree;

    parts.forEach((part, index) => {
      if (!current[part]) {
        if (index === parts.length - 1) {
          current[part] = null;
        } else {
          current[part] = {};
        }
      }
      current = current[part];
    });
  });

  // Helper function to log the tree
  const logTree = (node: any, indent: string = ""): void => {
    Object.entries(node).forEach(([key, value]) => {
      console.log(`${indent}- ${key}`);
      if (value) {
        logTree(value, `${indent}  `);
      }
    });
  };

  logTree(tree);
};

/**
 * Recursively reads all files in a given directory and retrieves their names.
 * @param directory - The directory to read files from.
 * @returns Promise that resolves with an array of file names.
 */
const readAllFilesRecursively = async (
  directory: string
): Promise<string[]> => {
  const result: string[] = [];

  const readDirectory = async (dir: string) => {
    const files = await FileSystem.readDirectoryAsync(dir);

    for (const file of files) {
      const fileUri = `${dir}/${file}`; // Ensure correct path format
      const info = await FileSystem.getInfoAsync(fileUri);

      if (info.isDirectory) {
        await readDirectory(fileUri);
      } else {
        result.push(info.uri);
      }
    }
  };

  await readDirectory(directory);
  return result;
};

export const DebugFileSystemProvider = ({ children }: Props) => {
  useEffect(() => {
    const fetchData = async () => {
      const files = await readAllFilesRecursively(
        `${FileSystem.documentDirectory}`
      );

      console.log(`${FileSystem.documentDirectory}`);
      logFileTree(
        files.map((file) => file.replace(`${FileSystem.documentDirectory}`, ""))
      );
    };

    fetchData().then();
  }, []);

  return <>{children}</>;
};
