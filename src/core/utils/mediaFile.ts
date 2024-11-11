import { randomId } from "@madeja-studio/cepillo";
import * as FileSystem from "expo-file-system";

interface Props {
  documentsDirectoryName: string;
  extension: string;
  uri: string;
}

/**
 * Moves a file to the device documents directory.
 *
 * This asynchronous function takes an object with properties `documentsDirectoryName`,
 * `extension`, and `uri`, and moves the file located at the given `uri` to a new
 * location in the specified documents subdirectory. If the file's name cannot be determined
 * from the URI, a random ID with the specified extension will be used as the file name.
 *
 * @param params - An object containing the following properties:
 * @param params.documentsDirectoryName - The name of the documents directory to move the file into.
 * @param params.extension - The file extension to use if the file name cannot be determined from the URI.
 * @param params.uri - The URI of the file to be moved.
 *
 * @returns The relative path of the moved file within the documents directory.
 *
 * @example
 * // Moves image.png from the temporary storage to the Documents/images directory
 * const relativePath = await moveToDocuments({
 *   documentsDirectoryName: 'images',
 *   extension: 'png',
 *   uri: 'file:///tmp/image.png'
 * });
 * console.log(relativePath); // Outputs: images/image.png
 */
export const moveToDocuments = async ({
  documentsDirectoryName,
  extension,
  uri,
}: Props) => {
  const fileName = uri.split("/").pop() ?? `${randomId()}.${extension}`;
  const relativePath = `${documentsDirectoryName}/${fileName}`;
  const absolutePath = `${FileSystem.documentDirectory}${relativePath}`;

  await FileSystem.makeDirectoryAsync(
    `${FileSystem.documentDirectory}${documentsDirectoryName}`,
    { intermediates: true }
  );

  await FileSystem.copyAsync({ from: uri, to: absolutePath });

  return relativePath;
};
