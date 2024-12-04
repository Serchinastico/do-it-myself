import { Audio } from "expo-av";
import { PermissionStatus } from "expo-av/build/Audio";
import { useCallback, useEffect, useState } from "react";

const VOLUME_CAPTURE_INTERVAL = 50;

type RecordingState = "idle" | "recording";

type StartRecordingResult =
  | { error?: "already_recording" | "permissions_denied"; type: "error" }
  | { type: "success" };

const useRecording = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
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
      if (recordingState === "recording")
        return { error: "already_recording", type: "error" };

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

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.LOW_QUALITY
      );
      setRecordingState("recording");
      setRecording(recording);

      return { type: "success" };
    }, [recordingState]);

  const stopRecording = useCallback(async () => {
    if (!recording) return;
    /**
     * Apparently, the recording duration is set back to 0 once we stop it, so
     * we get it right before ending the recording and set it to the recording
     * object so that it's updated for future use.
     * @see https://github.com/expo/expo/issues/17909
     */
    const status = await recording.getStatusAsync();
    await recording.stopAndUnloadAsync();
    recording._finalDurationMillis = status.durationMillis;
    setRecordingState("idle");

    return recording;
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
    recordingState,
    requestPermission,
    startRecording,
    stopRecording,
    volume,
  };
};

export default useRecording;
