import { Node } from "@tiptap/core";

export interface LocalImageOptions {
  HTMLAttributes: Record<string, any>;
  imagesRootPath: string;
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

export type OnImageClickProps = { fileName: string; groupId: string };
export type SetLocalImagesProps = { groupId: string; images: Image[] };
type Image = { fileName: string };

export const LocalImage = Node.create<LocalImageOptions>({
  addAttributes() {
    return { groupId: "", images: { default: [] } };
  },

  addCommands() {
    return {
      setLocalImages:
        (attrs: SetLocalImagesProps) =>
        ({ commands }) => {
          return commands.insertContent({ attrs, type: this.name });
        },
    };
  },

  addOptions() {
    return { HTMLAttributes: {}, imagesRootPath: "" };
  },

  atom: true,
  draggable: true,
  group: "block",
  name: "local-image",

  parseHTML() {
    return [
      {
        getAttrs: (dom) => {
          const groupId = dom.getAttribute("data-group-id");
          const images = Array.from(dom.querySelectorAll("img")).map((img) => ({
            fileName: img.getAttribute("data-file-name"),
          }));

          return { groupId, images };
        },
        tag: "div.image-masonry",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { imagesRootPath } = this.options;

    const images: Image[] = HTMLAttributes.images;
    const groupId: string = HTMLAttributes.groupId;

    const imagesHtml = images.map(({ fileName }) => [
      "img",
      {
        /**
         * We keep a reference to the raw fileName (without the leading path) to
         * make the component work when re-installing the app. The problem stems
         * from the app changing ID (and the full path having a reference to
         * such ID).
         * This means a URI like "file:///var/mobile/Containers/Data/Application/FD7F6FD4-1421-4189-92BA-77D814BCA86F/Documents/Image/IMG_8413.png"
         * will stop working on app reinstall so we just keep "Image/IMG_8413.png" and rebuild the URI with the current
         * FileSystem.documentDirectory information.
         */
        "data-file-name": fileName,
        src: `${imagesRootPath}${fileName}`,
      },
    ]);

    if (images.length === 1 || images.length === 2) {
      return [
        "div",
        {
          class: "image-masonry row",
          "data-click-event": "local-image",
          "data-group-id": groupId,
        },
        ...imagesHtml,
      ];
    } else if (images.length === 3 || images.length === 4) {
      const leftImages = imagesHtml.slice(0, 2);
      const rightImages = imagesHtml.slice(2);
      return [
        "div",
        {
          class: "image-masonry row",
          "data-click-event": "local-image",
          "data-group-id": groupId,
        },
        ["div", { class: "column full" }, ...leftImages],
        ["div", { class: "column full" }, ...rightImages],
      ];
    } else {
      return [
        "div",
        {
          class: "image-masonry row",
          "data-click-event": "local-image",
          "data-group-id": groupId,
        },
        ...imagesHtml,
      ];
    }
  },
});
