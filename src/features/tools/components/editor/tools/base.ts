import { ToolbarItem } from "@10play/tentap-editor";

const EDITOR_TOOLS = [
  {
    id: "title",
    image: () => require("@assets/icons/header.png"),
    selectable: true,
  },
  {
    id: "list",
    image: () => require("@assets/icons/list.png"),
    selectable: true,
  },
  {
    id: "equation",
    image: () => require("@assets/icons/equation.png"),
    selectable: true,
  },
  {
    id: "bold",
    image: () => require("@assets/icons/bold.png"),
    selectable: true,
  },
  {
    id: "italic",
    image: () => require("@assets/icons/italic.png"),
    selectable: true,
  },
  {
    id: "underline",
    image: () => require("@assets/icons/underline.png"),
    selectable: true,
  },
  {
    id: "link",
    image: () => require("@assets/icons/link.png"),
    selectable: false,
  },
  {
    id: "image",
    image: () => require("@assets/icons/image.png"),
    selectable: false,
  },
  {
    id: "audio",
    image: () => require("@assets/icons/mic.png"),
    selectable: false,
  },
  {
    id: "undo",
    image: () => require("@assets/icons/undo.png"),
    selectable: false,
  },
  {
    id: "redo",
    image: () => require("@assets/icons/redo.png"),
    selectable: false,
  },
] as const;

export type ToolCallbackArgs = Parameters<ToolbarItem["active"]>;

export interface EditorTool {
  id: string;
  image: () => any;
  isActive: (...args: ToolCallbackArgs) => boolean;
  isDisabled: (...args: ToolCallbackArgs) => boolean;
  onPress: (...args: ToolCallbackArgs) => void;
}
