import { getProjectColorById } from "@app/domain/project";
import { EditorTool } from "@app/features/tools/components/editor/tools/base";
import { t } from "@lingui/core/macro";
import { randomId } from "@madeja-studio/cepillo";
import dayjs from "dayjs";

export const DateTool: EditorTool = {
  id: "date",
  image: () => require("@assets/icons/calendar.png"),
  isActive: () => false,
  isDisabled: ({ editorState }) => editorState.isBulletListActive,
  onPress: ({ editor, project }) =>
    editor.createDate({
      backgroundColor: getProjectColorById(project.colorId).hex,
      date: dayjs().toISOString(),
      id: randomId(),
      text: t`Today`,
    }),
  tag: "icon",
};
