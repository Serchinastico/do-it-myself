import { AudioTool } from "./audio";
import { BoldTool } from "./bold";
import { FormulaTool } from "./formula";
import { ImageTool } from "./image";
import { ItalicTool } from "./italic";
import { LinkTool } from "./link";
import { ListTool } from "./list";
import { RedoTool } from "./redo";
import { TitleTool } from "./title";
import { UnderlineTool } from "./underline";
import { UndoTool } from "./undo";

/**
 * The order in which the tools appear in the list determines the order
 * of the icons in the toolbar.
 */
export const TOOLBAR_TOOLS = [
  TitleTool,
  ListTool,
  FormulaTool,
  BoldTool,
  ItalicTool,
  UnderlineTool,
  LinkTool,
  ImageTool,
  AudioTool,
  UndoTool,
  RedoTool,
];
