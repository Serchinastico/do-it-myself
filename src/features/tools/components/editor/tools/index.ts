import { BoldTool } from "./bold";
import { DateTool } from "./date";
import { ImageTool } from "./image";
import { ItalicTool } from "./italic";
import { ListTool } from "./list";
import { RedoTool } from "./redo";
import { TitleTool } from "./title";
import { UnderlineTool } from "./underline";
import { UndoTool } from "./undo";

/**
 * The order in which the tools appear in the list determines the order
 * of the icons in the toolbar.
 */
export const MANUAL_TOOLBAR = [
  TitleTool,
  ListTool,
  BoldTool,
  ItalicTool,
  UnderlineTool,
  ImageTool,
  UndoTool,
  RedoTool,
];

export const WORKLOG_TOOLBAR = [
  DateTool,
  ListTool,
  BoldTool,
  ItalicTool,
  UnderlineTool,
  ImageTool,
  UndoTool,
  RedoTool,
];
