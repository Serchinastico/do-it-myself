import { color } from "@app/core/theme/color";
import { t } from "@lingui/macro";
import { Column, Row, VectorIcon } from "@madeja-studio/telar";
import { ComponentProps } from "react";
import { Switch, SwitchProps, Text } from "react-native";

interface ToolSectionProps {
  description: string;
  icon: ComponentProps<typeof VectorIcon>["icon"];
  name: string;
  onValueChange: SwitchProps["onValueChange"];
  value: boolean;
}

const ToolSection = ({
  description,
  icon,
  name,
  onValueChange,
  value,
}: ToolSectionProps) => {
  return (
    <Row style={tw`mt-6`}>
      <Column style={tw`flex-1`}>
        <Row style={tw`items-center`}>
          <VectorIcon icon={icon} size={24} />
          <Text style={tw`button ml-2`}>{name}</Text>
        </Row>

        <Text style={tw`body mt-2`}>{description}</Text>
      </Column>

      <Switch
        onValueChange={onValueChange}
        trackColor={{ false: color.secondary, true: color.primary }}
        value={value}
      />
    </Row>
  );
};

interface Props {
  onWantsAttachmentsChange: SwitchProps["onValueChange"];
  onWantsManualChange: SwitchProps["onValueChange"];
  onWantsWorklogChange: SwitchProps["onValueChange"];
  wantsAttachments: boolean;
  wantsManual: boolean;
  wantsWorklog: boolean;
}

export const ToolsPicker = ({
  onWantsAttachmentsChange,
  onWantsManualChange,
  onWantsWorklogChange,
  wantsAttachments,
  wantsManual,
  wantsWorklog,
}: Props) => {
  return (
    <Column>
      <Text style={tw`h3 my-4`}>{t`Tools`}</Text>

      <Column style={tw`mx-4`}>
        <Text
          style={tw`body`}
        >{t`Tools allow you to adapt your project to your needs. Remember that you can add and remove tools whenever you want.`}</Text>

        <ToolSection
          description={t`Write the detailed steps for your project. Include a list of requirements, use variables to adapt your project, and export a manual that you can print and keep near your finished project.`}
          icon={{ family: "Feather", name: "book-open" }}
          name={t`Manual`}
          onValueChange={onWantsManualChange}
          value={wantsManual}
        />

        <ToolSection
          description={t`Record your progress on the project to resume it much more easily when you return to it.`}
          icon={{ family: "Feather", name: "bookmark" }}
          name={t`Worklog`}
          onValueChange={onWantsWorklogChange}
          value={wantsWorklog}
        />

        <ToolSection
          description={t`Save images and videos for future reference.`}
          icon={{ family: "Feather", name: "paperclip" }}
          name={t`Attachments`}
          onValueChange={onWantsAttachmentsChange}
          value={wantsAttachments}
        />
      </Column>
    </Column>
  );
};
