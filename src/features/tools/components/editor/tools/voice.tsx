import { RecordVoiceMemo } from "@app/features/tools/components/editor/tools/voice/RecordVoiceMemo";

import { EditorTool } from "./base";

export const VoiceTool: EditorTool = {
  component: RecordVoiceMemo,
  id: "voice",
  onPress: () => {},
  tag: "component",
};
