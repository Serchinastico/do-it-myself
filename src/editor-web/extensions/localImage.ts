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
      setLocalImages: (props: SetLocalImagesProps) => ReturnType;
    };
  }
}

type LocalImage = { uri: string };
export type SetLocalImagesProps = { images: LocalImage[] };

export const LocalImage = Node.create<LocalImageOptions>({
  addAttributes() {
    return { images: { default: [] } };
  },

  addCommands() {
    return {
      setLocalImages:
        ({ images }: SetLocalImagesProps) =>
        ({ commands }) => {
          return commands.insertContent({ attrs: { images }, type: this.name });
        },
    };
  },

  addOptions() {
    return { HTMLAttributes: {} };
  },

  atom: true,
  draggable: true,
  group: "block",
  name: "local-image",

  parseHTML() {
    return [
      {
        getAttrs: (dom) => {
          const images = Array.from(dom.querySelectorAll("img")).map((img) => ({
            uri: img.getAttribute("src"),
          }));
          return { images };
        },
        tag: "div.image-masonry",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const images: LocalImage[] = HTMLAttributes.images;
    const imagesHtml = images.map(({ uri }) => ["img", { src: uri }]);

    if (images.length === 1 || images.length === 2) {
      return ["div", { class: "image-masonry row" }, ...imagesHtml];
    } else if (images.length === 3 || images.length === 4) {
      const leftImages = imagesHtml.slice(0, 2);
      const rightImages = imagesHtml.slice(2);
      return [
        "div",
        { class: "image-masonry row" },
        ["div", { class: "column full" }, ...leftImages],
        ["div", { class: "column full" }, ...rightImages],
      ];
    } else {
      return ["div", { class: "image-masonry row" }, ...imagesHtml];
    }
  },
});
