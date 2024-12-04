import { BridgeState, EditorBridge } from "@10play/tentap-editor";
import { Project } from "@app/domain/project";
import { Tagged } from "@madeja-studio/cepillo";
import React from "react";
import { ImageSourcePropType } from "react-native";

export type EditorTool = (ComponentEditorTool | IconEditorTool) &
  Identifiable &
  MenuProps;

export interface MenuOption {
  key: string;
  onPress: (args: ToolCallbackArgs) => Promise<void> | void;
  text: string;
}

export type ToolCallbackArgs = {
  editor: EditorBridge;
  editorState: BridgeState;
  project: Project;
};

type ComponentEditorTool = Tagged<
  "component",
  {
    component: (props: ToolCallbackArgs) => React.JSX.Element;
  }
>;

type IconEditorTool = Tagged<
  "icon",
  {
    image: () => ImageSourcePropType;
    isActive: (args: ToolCallbackArgs) => boolean;
    isDisabled: (args: ToolCallbackArgs) => boolean;
  }
>;

type Identifiable = {
  id: string;
};

type MenuProps =
  | {
      hasMenu: true;
      menuOptions: readonly MenuOption[];
    }
  | {
      hasMenu?: false;
      onPress: (args: ToolCallbackArgs) => void;
    };
