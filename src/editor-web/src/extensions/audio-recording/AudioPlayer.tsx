import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef, useState } from "react";

import { AudioPlayerControls } from "./AudioPlayerControls";
import { Waveform } from "./Waveform";

const toDurationString = (durationInSeconds: number) => {
  const minutes = Math.max(0, Math.floor(durationInSeconds / 60));
  const seconds = Math.max(0, Math.floor(durationInSeconds % 60));

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const NUMBER_OF_WAVEFORM_LINES = 32;

export const AudioPlayer = ({ extension, node }: NodeViewProps) => {
  const fileName = node.attrs.fileName;
  const backgroundColor = extension.options.backgroundColor;
  const audioRootPath = extension.options.audioRootPath;

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [remainingPlayTime, setRemainingPlayTime] = useState(
    audioRef.current?.duration ?? 0
  );

  const normalizedDuration = audioRef.current?.duration ?? 1;
  const playTimeInSeconds = normalizedDuration - remainingPlayTime;
  const playProgress = playTimeInSeconds / normalizedDuration;

  const onPlay = useCallback(() => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        payload: {
          fileName: node.attrs.fileName,
          startTimeInMs: playTimeInSeconds * 1000,
        },
        type: "play-audio",
      })
    );
  }, [node, remainingPlayTime]);

  return (
    <NodeViewWrapper class="audio-player" style={{ backgroundColor }}>
      <audio
        onLoadedMetadata={(e) => setRemainingPlayTime(e.currentTarget.duration)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={(e) =>
          setRemainingPlayTime(
            e.currentTarget.duration - e.currentTarget.currentTime
          )
        }
        preload="metadata"
        ref={audioRef}
        src={`${audioRootPath}${fileName}`}
      />

      <AudioPlayerControls
        isPlaying={isPlaying}
        onPause={() => audioRef.current?.pause()}
        onPlay={onPlay}
      />

      <Waveform
        numberOfLines={NUMBER_OF_WAVEFORM_LINES}
        progress={playProgress}
      />

      <div className="remaining_time">
        {toDurationString(remainingPlayTime)}
      </div>
    </NodeViewWrapper>
  );
};
