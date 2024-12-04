import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useMemo, useRef, useState } from "react";

import { useInterval } from "../../../../core/hooks/useInterval";
import { AudioPlayerControls } from "./AudioPlayerControls";
import { Waveform } from "./Waveform";

const toDurationString = (durationInSeconds: number) => {
  const minutes = Math.max(0, Math.floor(durationInSeconds / 60));
  const seconds = Math.max(0, Math.floor(durationInSeconds % 60));

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const NUMBER_OF_WAVEFORM_LINES = 32;
const WAVEFORM_UPDATE_INTERVAL_IN_MS = 50;

export const AudioPlayer = ({ extension, node }: NodeViewProps) => {
  const backgroundColor = extension.options.backgroundColor;
  const durationInMs = node.attrs.durationInMs;

  const [isPlaying, setIsPlaying] = useState(false);
  const [playtimeProgress, setPlaytimeProgress] = useState(0);
  const remainingTimeInMs = useMemo(
    () => durationInMs - playtimeProgress * durationInMs,
    [playtimeProgress]
  );
  const playtimeInMs = useRef(0);

  const onPlay = useCallback(() => {
    const startTimeInMs =
      playtimeInMs.current >= durationInMs ? 0 : playtimeInMs.current;
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        payload: {
          fileName: node.attrs.fileName,
          startTimeInMs,
        },
        type: "play-audio",
      })
    );

    setIsPlaying(true);
    playtimeInMs.current = startTimeInMs;
    setPlaytimeProgress(startTimeInMs / durationInMs);
  }, [node]);

  const onPause = useCallback(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        payload: { fileName: node.attrs.fileName },
        type: "pause-audio",
      })
    );

    setIsPlaying(false);
  }, [node]);

  useInterval(
    () => {
      if (playtimeInMs.current >= durationInMs) {
        setIsPlaying(false);
        setPlaytimeProgress(1);
        return false;
      }

      playtimeInMs.current += WAVEFORM_UPDATE_INTERVAL_IN_MS;
      setPlaytimeProgress(playtimeInMs.current / durationInMs);
      return true;
    },
    isPlaying ? WAVEFORM_UPDATE_INTERVAL_IN_MS : null,
    [durationInMs, isPlaying]
  );

  return (
    <NodeViewWrapper
      class="audio-player"
      onClick={() => (isPlaying ? onPause() : onPlay())}
      style={{ backgroundColor }}
    >
      <AudioPlayerControls isPlaying={isPlaying} />

      <Waveform
        numberOfLines={NUMBER_OF_WAVEFORM_LINES}
        progress={playtimeProgress}
      />

      <div className="remaining_time">
        {toDurationString(remainingTimeInMs / 1000)}
      </div>
    </NodeViewWrapper>
  );
};
