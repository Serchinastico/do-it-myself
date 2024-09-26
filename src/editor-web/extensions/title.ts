import { Node, mergeAttributes } from "@tiptap/core";

export interface TitleOptions {
  HTMLAttributes: Record<string, any>;
  backgroundColor: string;
}

export const Title = Node.create<TitleOptions>({
  addAttributes() {
    return {
      backgroundColor: {
        default: "#F90",
        rendered: false,
      },
    };
  },
  addNodeView() {
    const options = this.options;
    const editor = this.editor;

    return ({ node }) => {
      const dom = document.createElement("div");
      dom.classList.add("container");
      dom.style.position = "relative";
      dom.style.display = "inline-block";
      dom.style.marginLeft = "6px";

      const title = document.createElement("h1");
      title.classList.add("title");
      title.contentEditable = "true";
      title.innerHTML = node.textContent;
      title.style.paddingLeft = "12px";
      title.style.paddingRight = "12px";
      title.style.marginTop = "8px";
      title.style.marginBottom = "8px";
      title.style.fontSize = "20px";
      title.style.fontWeight = "bold";

      const background = document.createElement("div");
      background.classList.add("background");
      background.style.position = "absolute";
      background.style.top = "0";
      background.style.bottom = "0";
      background.style.left = "0";
      background.style.right = "0";
      background.style.borderRadius = "6px";
      background.style.backgroundColor = options.backgroundColor;
      background.style.transform = "skewX(20deg)";
      background.style.zIndex = "-1";

      dom.appendChild(title);
      dom.appendChild(background);

      return { contentDOM: title, dom };
    };
  },
  addOptions() {
    return {
      HTMLAttributes: {},
      backgroundColor: "#F90",
    };
  },
  content: "inline",
  defining: true,
  group: "block",
  name: "title",
  parseHTML() {
    return [{ tag: "title" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "title",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  selectable: false,
});
