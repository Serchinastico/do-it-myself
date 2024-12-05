import { EventMessage } from "@app/core/event-bus/eventBus";
import useEventBus from "@app/core/event-bus/useEventBus";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

export const useAudioPlayerPressHandler = () => {
  const [currentAudio, setCurrentAudio] = useState<Audio.SoundObject | null>(
    null
  );

  useEventBus(
    EventMessage.AudioPlay,
    async ({ fileName, startTimeInMs }) => {
      if (currentAudio) {
        await currentAudio.sound.pauseAsync();
      }

      const uri = `${FileSystem.documentDirectory}${fileName}`;
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });
      const audio = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );

      await audio.sound.playFromPositionAsync(startTimeInMs);
      setCurrentAudio(audio);
    },
    []
  );

  useEventBus(
    EventMessage.AudioPause,
    async () => {
      if (!currentAudio) return;

      await currentAudio.sound.pauseAsync();
    },
    [currentAudio]
  );
};
