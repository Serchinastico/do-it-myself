import { Node, mergeAttributes } from "@tiptap/core";

export interface TitleOptions {
  HTMLAttributes: Record<string, any>;
  backgroundColor: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    title: {
      /**
       * Toggle a title
       */
      toggleTitle: (attrs: ToggleTitleProps) => ReturnType;
    };
  }
}

export type ToggleTitleProps = { backgroundColor: string };

export const Title = Node.create<TitleOptions>({
  addAttributes() {
    return {
      backgroundColor: {
        default: "#F90",
      },
    };
  },

  addCommands() {
    return {
      toggleTitle:
        (attrs: ToggleTitleProps) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph", attrs);
        },
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {},
      backgroundColor: "#F90",
    };
  },
  atom: false,
  content: "inline*",
  defining: true,
  group: "block",
  name: "title",

  parseHTML() {
    return [
      {
        getAttrs: (dom) => ({
          backgroundColor:
            dom.querySelector<HTMLDivElement>(".skew")?.style.backgroundColor,
        }),
        tag: ".title",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const backgroundColor: string = HTMLAttributes.backgroundColor;

    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "title",
      }),
      [
        "div",
        { class: "skew", style: `background-color: ${backgroundColor};` },
      ],
      ["h1", { class: "content" }, 0],
    ];
  },
});
