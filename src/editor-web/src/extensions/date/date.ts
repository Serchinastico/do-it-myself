import { Node, mergeAttributes } from "@tiptap/core";

import { doNotDeletePlugin } from "../plugins/doNotDeletePlugin";

export interface DateOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    date: {
      createDate: (attrs: CreateDateProps) => ReturnType;
      setDate: (attrs: SetDateProps) => ReturnType;
    };
  }
}

export type SetDateProps = {
  /**
   * In ISO-8601 format
   * {@link https://en.wikipedia.org/wiki/ISO_8601}
   */
  date: string;
  id: string;
  text: string;
};

export type CreateDateProps = {
  backgroundColor: string;
  /**
   * In ISO-8601 format
   * {@link https://en.wikipedia.org/wiki/ISO_8601}
   */
  date: string;
  id: string;
  text: string;
};

export type OnDateClickProps = { date: string; id: string };

export const Date = Node.create<DateOptions>({
  addAttributes() {
    return {
      backgroundColor: { default: "#F90" },
      date: { default: "1970-01-01T01:00:00+01:00" },
      id: { default: "" },
      text: { default: "Never" },
    };
  },

  addCommands() {
    return {
      createDate:
        (attrs: CreateDateProps) =>
        ({ commands }) => {
          return commands.insertContent({ attrs, type: this.name });
        },
      setDate:
        (props: SetDateProps) =>
        ({ dispatch, state }) => {
          const { doc, tr } = state;

          doc.descendants((node, pos) => {
            if (node.type.name === "date" && node.attrs.id === props.id) {
              // Replace the node attributes
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                date: props.date,
                text: props.text,
              });
            }
          });

          if (tr.steps.length) {
            dispatch?.(tr);
            return true;
          }

          return false;
        },
    };
  },

  addOptions() {
    return {
      HTMLAttributes: {},
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
        getAttrs: (dom) => {
          const skew = dom.querySelector<HTMLDivElement>(".skew");
          const content = dom.querySelector<HTMLHeadingElement>(".content");
          return {
            backgroundColor: skew?.style.backgroundColor,
            date: content?.dataset["date"],
            id: dom.dataset["id"],
            text: content?.textContent,
          };
        },
        tag: ".date",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { backgroundColor, date, id, text } = HTMLAttributes;

    return [
      "div",
      mergeAttributes({
        class: "date",
        "data-click-event": "date",
        "data-id": id,
      }),
      [
        "div",
        { class: "skew", style: `background-color: ${backgroundColor};` },
      ],
      ["h1", { class: "content", "data-date": date }, text],
    ];
  },

  selectable: false,
});
