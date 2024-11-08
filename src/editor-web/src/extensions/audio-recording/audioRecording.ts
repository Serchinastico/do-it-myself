import { Node } from "@tiptap/core";

const PLAY_CONTROL_RAW = `
<svg class="play-icon" width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62ZM26.5408 20.9905C25.8752 20.5627 25 21.0405 25 21.8317V40.1683C25 40.9595 25.8752 41.4373 26.5408 41.0095L40.8026 31.8412C41.4149 31.4475 41.4149 30.5525 40.8026 30.1588L26.5408 20.9905Z" fill="#17181C"/>
</svg>
`;

const PAUSE_CONTROL_RAW = `
<svg class="pause-icon hidden" width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M26 38H28V24H26V38Z" fill="#17181C"/>
  <path d="M36 38H34V24H36V38Z" fill="#17181C"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M62 31C62 48.1208 48.1208 62 31 62C13.8792 62 0 48.1208 0 31C0 13.8792 13.8792 0 31 0C48.1208 0 62 13.8792 62 31ZM24 23C24 22.4477 24.4477 22 25 22H29C29.5523 22 30 22.4477 30 23V39C30 39.5523 29.5523 40 29 40H25C24.4477 40 24 39.5523 24 39V23ZM33 22C32.4477 22 32 22.4477 32 23V39C32 39.5523 32.4477 40 33 40H37C37.5523 40 38 39.5523 38 39V23C38 22.4477 37.5523 22 37 22H33Z" fill="#17181C"/>
</svg>
`;

const WAVEFORM_RAW = `
<svg class="waveform" width="178" height="80" viewBox="0 0 178 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.5 1L1.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"  />
  <path d="M6.5 1L6.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M11.5 1L11.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M16.5 1L16.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M21.5 1L21.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M26.5 1L26.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M31.5 1L31.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M36.5 1L36.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M41.5 1L41.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M46.5 1L46.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M51.5 1L51.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M56.5 1L56.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M61.5 1L61.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M66.5 1L66.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M71.5 1L71.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M76.5 1L76.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M81.5 1L81.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M86.5 1L86.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M91.5 1L91.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M96.5 1L96.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M101.5 1L101.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M106.5 1L106.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M111.5 1L111.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M116.5 1L116.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M121.5 1L121.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M126.5 1L126.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M131.5 1L131.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M136.5 1L136.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M141.5 1L141.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M146.5 1L146.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M151.5 1L151.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M156.5 1L156.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M161.5 1L161.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M166.5 1L166.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M171.5 1L171.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
  <path d="M176.5 1L176.5 9" stroke="#00000044" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

export interface AudioRecordingOptions {
  audioRootPath: string;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    audioRecording: {
      /**
       * Loads a local image
       */
      setAudioRecording: (props: SetAudioRecordingProps) => ReturnType;
    };
  }
}

export type SetAudioRecordingProps = { fileName: string };

export const AudioRecording = Node.create<AudioRecordingOptions>({
  addAttributes() {
    return { fileName: "" };
  },

  addCommands() {
    return {
      setAudioRecording:
        (attrs: SetAudioRecordingProps) =>
        ({ commands }) => {
          return commands.insertContent({ attrs, type: this.name });
        },
    };
  },

  addOptions() {
    return { audioRootPath: "", HTMLAttributes: {} };
  },

  atom: true,
  draggable: true,
  group: "block",
  name: "audio-recording",

  parseHTML() {
    return [
      {
        getAttrs: (dom) => {
          const fileName = dom.getAttribute("data-file-name");

          return { fileName };
        },
        tag: "div.audio-player",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { audioRootPath } = this.options;

    const fileName: string = HTMLAttributes.fileName;

    const controls = document.createElement("div");
    controls.className = "controls";
    controls.innerHTML = `${PLAY_CONTROL_RAW}${PAUSE_CONTROL_RAW}`;

    const waveform = document.createElement("div");
    waveform.className = "waveform";
    waveform.innerHTML = WAVEFORM_RAW;

    return [
      "div",
      { class: "audio-player", "data-file-name": fileName },
      ["audio", { src: `${audioRootPath}${fileName}` }],
      controls,
      waveform,
      ["div", { class: "remaining_time" }],
    ];
  },
});
