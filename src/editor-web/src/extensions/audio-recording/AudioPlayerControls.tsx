import { DOMAttributes, HTMLAttributes } from "react";

type ClassName = HTMLAttributes<any>["className"];
type OnClick = DOMAttributes<any>["onClick"];

type ControlButtonProps = {
  className: ClassName;
  onClick: OnClick;
};

const PlayButton = ({ className, onClick }: ControlButtonProps) => {
  return (
    <svg
      className={`play-icon ${className}`}
      fill="none"
      height="62"
      onClick={onClick}
      viewBox="0 0 62 62"
      width="62"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62ZM26.5408 20.9905C25.8752 20.5627 25 21.0405 25 21.8317V40.1683C25 40.9595 25.8752 41.4373 26.5408 41.0095L40.8026 31.8412C41.4149 31.4475 41.4149 30.5525 40.8026 30.1588L26.5408 20.9905Z"
        fill="#17181C"
        fill-rule="evenodd"
      />
    </svg>
  );
};

const PauseButton = ({ className, onClick }: ControlButtonProps) => {
  return (
    <svg
      className={`pause-icon ${className}`}
      fill="none"
      height="62"
      onClick={onClick}
      viewBox="0 0 62 62"
      width="62"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M26 38H28V24H26V38Z" fill="#17181C" />
      <path d="M36 38H34V24H36V38Z" fill="#17181C" />
      <path
        clip-rule="evenodd"
        d="M62 31C62 48.1208 48.1208 62 31 62C13.8792 62 0 48.1208 0 31C0 13.8792 13.8792 0 31 0C48.1208 0 62 13.8792 62 31ZM24 23C24 22.4477 24.4477 22 25 22H29C29.5523 22 30 22.4477 30 23V39C30 39.5523 29.5523 40 29 40H25C24.4477 40 24 39.5523 24 39V23ZM33 22C32.4477 22 32 22.4477 32 23V39C32 39.5523 32.4477 40 33 40H37C37.5523 40 38 39.5523 38 39V23C38 22.4477 37.5523 22 37 22H33Z"
        fill="#17181C"
        fill-rule="evenodd"
      />
    </svg>
  );
};

interface Props {
  isPlaying: boolean;
  onPause: () => void;
  onPlay: () => void;
}

export const AudioPlayerControls = ({ isPlaying, onPause, onPlay }: Props) => {
  return (
    <div className="controls">
      <PlayButton className={isPlaying ? "hidden" : ""} onClick={onPlay} />
      <PauseButton className={isPlaying ? "" : "hidden"} onClick={onPause} />
    </div>
  );
};
