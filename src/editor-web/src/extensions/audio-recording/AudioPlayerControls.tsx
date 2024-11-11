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
      height="44"
      onClick={onClick}
      viewBox="0 0 44 44"
      width="44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44ZM18.8354 14.8965C18.3631 14.5929 17.7419 14.932 17.7419 15.4934V28.5066C17.7419 29.068 18.3631 29.4071 18.8354 29.1035L28.9567 22.597C29.3912 22.3176 29.3912 21.6824 28.9567 21.403L18.8354 14.8965Z"
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
      height="44"
      onClick={onClick}
      viewBox="0 0 44 44"
      width="44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.4516 26.9677H19.871V17.0323H18.4516V26.9677Z"
        fill="#17181C"
      />
      <path
        d="M25.5484 26.9677H24.129V17.0323H25.5484V26.9677Z"
        fill="#17181C"
      />
      <path
        clip-rule="evenodd"
        d="M44 22C44 34.1503 34.1503 44 22 44C9.84974 44 0 34.1503 0 22C0 9.84974 9.84974 0 22 0C34.1503 0 44 9.84974 44 22ZM17.0323 16.3226C17.0323 15.9306 17.35 15.6129 17.7419 15.6129H20.5806C20.9726 15.6129 21.2903 15.9306 21.2903 16.3226V27.6774C21.2903 28.0694 20.9726 28.3871 20.5806 28.3871H17.7419C17.35 28.3871 17.0323 28.0694 17.0323 27.6774V16.3226ZM23.4194 15.6129C23.0274 15.6129 22.7097 15.9306 22.7097 16.3226V27.6774C22.7097 28.0694 23.0274 28.3871 23.4194 28.3871H26.2581C26.65 28.3871 26.9677 28.0694 26.9677 27.6774V16.3226C26.9677 15.9306 26.65 15.6129 26.2581 15.6129H23.4194Z"
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
