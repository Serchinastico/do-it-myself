import { Node, mergeAttributes } from "@tiptap/core";

export const ImmutableSection = Node.create({
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement("p");
      dom.contentEditable = "false";
      dom.classList.add("immutable-section");
      dom.innerHTML = node.textContent;

      return { dom };
    };
  },
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  atom: true,
  content: "paragraph",
  defining: true,
  group: "block",
  name: "immutableSection",
  parseHTML() {
    return [{ tag: "immutable-section" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["immutable-section", mergeAttributes(HTMLAttributes)];
  },

  selectable: false,
});
