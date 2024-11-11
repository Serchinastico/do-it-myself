import { moveToDocuments } from "@app/core/utils/mediaFile";
import { LocalImage } from "@app/domain/project";
import { t } from "@lingui/macro";
import { randomId, Tagged } from "@madeja-studio/cepillo";
import * as FileSystem from "expo-file-system";
import {
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  ImagePickerAsset,
  ImagePickerOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { MediaTypeOptions } from "expo-image-picker/src/ImagePicker.types";

interface InternalImagePickerSuccess {
  assets: ImagePickerAsset[];
}

interface ImagePickerSuccess {
  images: LocalImage[];
}

interface ImagePickerError {
  code: "access_denied" | "camera_unavailable" | "user_canceled";
  message?: string;
}

export type InternalImagePickerResult =
  | Tagged<"error", ImagePickerError>
  | Tagged<"success", InternalImagePickerSuccess>;

export type ImagePickerResult =
  | Tagged<"error", ImagePickerError>
  | Tagged<"success", ImagePickerSuccess>;

const ACCESS_DENIED_ERROR: InternalImagePickerResult = {
  code: "access_denied",
  message: t`Access to your camera or media library is required to pick a picture`,
  tag: "error",
};

const USER_CANCELED_ERROR: InternalImagePickerResult = {
  code: "user_canceled",
  message: t`Canceled the selection of an image`,
  tag: "error",
};

const CAMERA_UNAVAILABLE_ERROR: InternalImagePickerResult = {
  code: "camera_unavailable",
  message: t`Camera unavailable`,
  tag: "error",
};

const IMAGES_DIRECTORY = "Image";

/**
 * Asynchronously stores an image asset locally in the application's file system.
 * This ensures the image can be used even after app re-installs.
 *
 * @param assets The image assets to be stored. Each asset must contain at least a URI.
 * @returns A promise that resolves to the relative path of the stored image file,
 * or undefined if the asset is not provided.
 */
const storeImagesLocally = async (assets: ImagePickerAsset[]) => {
  const images: LocalImage[] = [];

  for (const asset of assets) {
    const path = await moveToDocuments({
      documentsDirectoryName: IMAGES_DIRECTORY,
      extension: "jpg",
      uri: asset.uri,
    });

    // Return the relative path to preserve the image between app updates
    images.push({
      height: asset.height,
      id: randomId(),
      path: path,
      width: asset.width,
    });
  }

  return images;
};

/**
 * Retrieves an image from the camera using the specified image picker options.
 *
 * This function first checks and requests camera permissions if necessary.
 * If permissions are granted, it launches the camera for the user to take a picture.
 * The function handles possible errors and permission denials, returning appropriate error codes.
 *
 * @param options Options to configure the image picker.
 * @returns A promise that resolves to the image picker result or an error code.
 */
const getImageFromCamera = async (
  options: ImagePickerOptions
): Promise<InternalImagePickerResult> => {
  const cameraPermissionStatus = await getCameraPermissionsAsync();
  try {
    if (
      !cameraPermissionStatus?.granted &&
      cameraPermissionStatus?.canAskAgain
    ) {
      const result = await requestCameraPermissionsAsync();
      if (!result.granted) return ACCESS_DENIED_ERROR;
    }

    const result = await launchCameraAsync(options);

    if (result.canceled || !result.assets) {
      return USER_CANCELED_ERROR;
    }

    return { assets: result.assets, tag: "success" };
  } catch {
    return CAMERA_UNAVAILABLE_ERROR;
  }
};

/**
 * Fetches an image from the user's media library.
 *
 * This asynchronous function manages permissions to access the media library.
 * It requests permissions if they are not already granted and captures an image
 * based on the provided options. The function returns an object containing the selected
 * image asset and a success tag, or an error indicating why the image could not
 * be retrieved.
 *
 * @param options Configuration options for image selection from the media library.
 * @returns A promise that resolves to an ImagePickerResult indicating the outcome.
 */
const getImageFromMediaLibrary = async (
  options: ImagePickerOptions
): Promise<InternalImagePickerResult> => {
  const mediaLibraryPermissionStatus = await getMediaLibraryPermissionsAsync();

  try {
    if (
      !mediaLibraryPermissionStatus?.granted &&
      mediaLibraryPermissionStatus?.canAskAgain
    ) {
      const result = await requestMediaLibraryPermissionsAsync();
      if (!result.granted) return ACCESS_DENIED_ERROR;
    }

    const result = await launchImageLibraryAsync(options);

    if (result.canceled || !result.assets) {
      return USER_CANCELED_ERROR;
    }

    return { assets: result.assets, tag: "success" };
  } catch {
    return CAMERA_UNAVAILABLE_ERROR;
  }
};

/**
 * Retrieves an image from a given source, which can either be the camera or the media library,
 * and optionally processes it based on the provided options.
 *
 * @param source The source from which to retrieve the image. Valid sources are "camera" and "media_library".
 * @param options Optional configuration for image retrieval,
 * including whether to return the image as a base64 string and the desired quality of the image.
 * @returns A promise that resolves with the result of the image picking action. If the
 * action is successful, the result includes the image asset and a success tag.
 * @throws Will throw an error if the image retrieval fails for any reason.
 */
export const getImagesFrom = async (
  source: ImageSource,
  options: ImagePickerOptions = {
    allowsMultipleSelection: true,
    mediaTypes: MediaTypeOptions.Images,
    quality: 0.2,
  }
): Promise<ImagePickerResult> => {
  let result: InternalImagePickerResult;
  switch (source) {
    case "camera":
      result = await getImageFromCamera(options);
      break;
    case "media_library":
      result = await getImageFromMediaLibrary(options);
      break;
  }

  if (result.tag === "error") {
    return result;
  }

  const images = await storeImagesLocally(result.assets);
  return { images, tag: "success" };
};

export type ImageSource = "camera" | "media_library";
