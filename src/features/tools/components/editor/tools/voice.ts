import { EditorTool } from "./base";

export const VoiceTool: EditorTool = {
  id: "voice",
  image: () => require("@assets/icons/mic.png"),
  isActive: () => false,
  isDisabled: () => false,
  onPress: () => {},
};
