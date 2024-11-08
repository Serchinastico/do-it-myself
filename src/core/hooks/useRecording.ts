import { Audio } from "expo-av";
import { PermissionStatus } from "expo-av/build/Audio";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useState } from "react";

const VOLUME_CAPTURE_INTERVAL = 50;

type StartRecordingResult =
  | { error?: "permissions_denied"; type: "error" }
  | { type: "success" };

const useRecording = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [volume, setVolume] = useState<number>(0);

  const hasGrantedPermission = useCallback(async () => {
    const permission = await Audio.getPermissionsAsync();

    return permission.granted;
  }, []);

  const requestPermission = useCallback(async () => {
    const result = await Audio.requestPermissionsAsync();

    return result.granted;
  }, []);

  const startRecording =
    useCallback(async (): Promise<StartRecordingResult> => {
      const permission = await Audio.getPermissionsAsync();

      if (permission.status === PermissionStatus.UNDETERMINED) {
        const result = await Audio.requestPermissionsAsync();
        if (!result.granted)
          return { error: "permissions_denied", type: "error" };
      }

      if (permission.status === PermissionStatus.DENIED) {
        if (permission.canAskAgain) {
          const result = await Audio.requestPermissionsAsync();
          if (!result.granted)
            return { error: "permissions_denied", type: "error" };
        } else {
          return { error: "permissions_denied", type: "error" };
        }
      }

      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);

      return { type: "success" };
    }, []);

  const stopRecording = useCallback(async () => {
    await recording?.stopAndUnloadAsync();
  }, [recording]);

  useEffect(() => {
    if (!recording) return;

    const interval = setInterval(async () => {
      if (!recording) {
        clearInterval(interval);
        return;
      }

      try {
        const status = await recording.getStatusAsync();
        const currentMetering = status.metering ?? -160;
        /**
         * Metering values go from -160 (for silence) to 0 for loudest sounds
         * so we normalize the value to be on a [0,1] range
         */
        const volume = (160 + currentMetering) / 160;
        setVolume(volume);
      } catch {
        clearInterval(interval);
      }
    }, VOLUME_CAPTURE_INTERVAL);

    return () => clearInterval(interval);
  }, [recording]);

  return {
    hasGrantedPermission,
    recording,
    requestPermission,
    startRecording,
    stopRecording,
    volume,
  };
};

export default useRecording;
