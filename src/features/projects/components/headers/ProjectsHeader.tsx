import { Header } from "@app/core/components/Header";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { t } from "@lingui/macro";
import { clamp, lerp } from "@madeja-studio/cepillo";
import { Button, OnPress } from "@madeja-studio/telar";
import chroma from "chroma-js";

interface Props {
  onSettingsPress: OnPress;
  scrollOffset: number;
}

export const ProjectsHeader = ({ onSettingsPress, scrollOffset }: Props) => {
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const colorSwitch = useColorSwitch();

  return (
    <Header
      style={tw.style({
        borderBottomWidth: 0.5,
        borderColor: chroma(colorSwitch({ dark: "white", light: "ash" })!)
          .alpha(
            clamp(lerp(scrollOffset, { max: 50, min: 30 }), {
              max: 0.25,
              min: 0,
            })
          )
          .hex(),
      })}
      title={t`Projects`}
    >
      <Button.Icon
        color="secondary"
        hasHapticFeedback={isHapticFeedbackEnabled}
        icon={{ family: "Feather", name: "user" }}
        iconTint={colorSwitch({ dark: "white", light: "ash" })}
        onPress={onSettingsPress}
        variant="text"
      />
    </Header>
  );
};
