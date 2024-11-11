import { useMemo, useState } from "react";

interface Props {
  numberOfLines: number;
  /**
   * The progress of the audio playing in a range [0, 1] where 0 is not started
   * and 1 is the audio finished playing
   */
  progress: number;
}

export const Waveform = ({ numberOfLines, progress }: Props) => {
  const linesPathData = useMemo(() => {
    return Array.from(Array(numberOfLines), (_, index) => {
      const height = Math.random() * 40;

      return `M ${1.5 + 5 * index} ${40 + height / 2} v ${-height}`;
    });
  }, [numberOfLines]);

  /**
   * This is the number of lines that have been played. All
   * lines with an index lower than this value must be painted
   * as played.
   */
  const playedLines = Math.round(progress * numberOfLines);

  return (
    <svg
      className="waveform"
      fill="none"
      height="80"
      viewBox="0 0 178 80"
      width="178"
      xmlns="http://www.w3.org/2000/svg"
    >
      {linesPathData.map((pathData, index) => (
        <path
          d={pathData}
          stroke={index < playedLines ? "#000000" : "#00000044"}
          stroke-linecap="round"
          stroke-width="2"
        />
      ))}
    </svg>
  );
};
