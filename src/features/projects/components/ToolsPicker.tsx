import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { color } from "@app/core/theme/color";
import { t } from "@lingui/macro";
import { Column, IconReference, Row, VectorIcon } from "@madeja-studio/telar";
import chroma from "chroma-js";
import { Platform, Switch, SwitchProps, Text } from "react-native";

interface ToolSectionProps {
  description: string;
  icon: IconReference;
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
  const isAndroid = Platform.OS === "android";
  const colorSwitch = useColorSwitch();

  return (
    <Row style={tw`mt-6 items-start`}>
      <Column style={tw`flex-1`}>
        <Row style={tw`items-center`}>
          <VectorIcon
            color={colorSwitch({ dark: "white", light: "ash" })}
            icon={icon}
            size={24}
          />
          <Text
            style={[
              tw`button ml-2`,
              {
                color: colorSwitch({
                  dark: "white",
                  light: "ash",
                }),
              },
            ]}
          >
            {name}
          </Text>
        </Row>

        <Text style={tw`body mt-2`}>{description}</Text>
      </Column>

      <Switch
        onValueChange={onValueChange}
        style={tw`android:mt--4 ml-4`}
        thumbColor={isAndroid ? color.primary : color.white}
        trackColor={{
          false: isAndroid
            ? chroma(color.black).alpha(0.1).hex()
            : color.secondary,
          true: isAndroid
            ? chroma(color.primary).alpha(0.4).hex()
            : color.primary,
        }}
        value={value}
      />
    </Row>
  );
};

type ErrorProps =
  | {
      errorMessage: string;
      hasError: true;
    }
  | {
      hasError?: false;
    };

type Props = ErrorProps & {
  onWantsAttachmentsChange: SwitchProps["onValueChange"];
  onWantsManualChange: SwitchProps["onValueChange"];
  onWantsWorklogChange: SwitchProps["onValueChange"];
  wantsAttachments: boolean;
  wantsManual: boolean;
  wantsWorklog: boolean;
};

export const ToolsPicker = ({
  onWantsAttachmentsChange,
  onWantsManualChange,
  onWantsWorklogChange,
  wantsAttachments,
  wantsManual,
  wantsWorklog,
  ...props
}: Props) => {
  return (
    <Column>
      <Text style={tw`h3 my-4`}>{t`Tools`}</Text>

      <Column style={tw`mx-4`}>
        <Text
          style={tw`body`}
        >{t`Tools allow you to adapt your project to your needs. Remember that you can add and remove tools whenever you want.`}</Text>

        {props.hasError && (
          <Text style={tw`error mt-2`}>{props.errorMessage}</Text>
        )}

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
