import { Node } from "@tiptap/core";

export interface LocalImageOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    localImage: {
      /**
       * Loads a local image
       */
      setLocalImage: (props: SetLocalImageProps) => ReturnType;
    };
  }
}

export type SetLocalImageProps = { base64: string; uri: string };

export const LocalImage = Node.create<LocalImageOptions>({
  addAttributes() {
    return {
      "data-uri": { default: null },
      src: { default: null },
    };
  },
  addCommands() {
    return {
      setLocalImage:
        ({ base64, uri }: SetLocalImageProps) =>
        ({ commands }) =>
          commands.insertContent(
            `<img src="data:image/png;base64,${base64}" data-uri="${uri}" />`
          ),
    };
  },
  addOptions() {
    return { HTMLAttributes: {} };
  },
  draggable: true,
  group: "block",
  name: "image",
  parseHTML() {
    return [
      {
        getAttrs: (el) => ({
          src: (el as HTMLImageElement).getAttribute("src"),
        }),
        tag: "img",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["img", HTMLAttributes, ["source", HTMLAttributes]];
  },
});
