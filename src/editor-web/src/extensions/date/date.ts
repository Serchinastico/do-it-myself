import { Node, mergeAttributes } from "@tiptap/core";

import { doNotDeletePlugin } from "../plugins/doNotDeletePlugin";

export interface DateOptions {
  HTMLAttributes: Record<string, any>;
  backgroundColor: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    date: {
      /**
       * Toggle a title
       */
      toggleDate: (attrs: ToggleDateProps) => ReturnType;
    };
  }
}

export type ToggleDateProps = { backgroundColor: string; id: string };
export type OnDateClickProps = { id: string };

export const Date = Node.create<DateOptions>({
  addAttributes() {
    return {
      backgroundColor: { default: "#F90" },
      id: { default: "" },
    };
  },

  addCommands() {
    return {
      toggleDate:
        (attrs: ToggleDateProps) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, "paragraph", attrs);
        },
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {},
      backgroundColor: "#F9A",
      id: "",
    };
  },
  addProseMirrorPlugins() {
    return [doNotDeletePlugin("date")];
  },
  atom: true,
  content: "inline*",
  defining: true,
  group: "block",
  isolating: true,
  name: "date",

  parseHTML() {
    return [
      {
        getAttrs: (dom) => ({
          backgroundColor:
            dom.querySelector<HTMLDivElement>(".skew")?.style.backgroundColor,
          id: dom.dataset["id"],
        }),
        tag: ".date",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const backgroundColor: string = HTMLAttributes.backgroundColor;
    const id: string = HTMLAttributes.id;

    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "date",
        "data-click-event": "date",
        "data-id": id,
      }),
      [
        "div",
        { class: "skew", style: `background-color: ${backgroundColor};` },
      ],
      ["h1", { class: "content" }, 0],
    ];
  },

  selectable: false,
});
