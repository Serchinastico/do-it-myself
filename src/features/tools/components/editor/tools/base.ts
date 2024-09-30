import { BridgeState, EditorBridge } from "@10play/tentap-editor";
import { ImageSourcePropType } from "react-native";

export type ToolCallbackArgs = {
  editor: EditorBridge;
  editorState: BridgeState;
};

export type EditorTool = {
  id: string;
  image: () => ImageSourcePropType;
  isActive: (args: ToolCallbackArgs) => boolean;
  isDisabled: (args: ToolCallbackArgs) => boolean;
} & MenuProps;

type MenuProps =
  | {
      hasMenu: true;
      menuOptions: readonly MenuOption[];
    }
  | {
      hasMenu?: false;
      onPress: (args: ToolCallbackArgs) => void;
    };

export interface MenuOption {
  key: string;
  onPress: (args: ToolCallbackArgs) => Promise<void> | void;
  text: string;
}
