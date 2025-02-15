import { Header } from "@app/core/components/Header";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useLingui } from "@lingui/react/macro";
import { clamp, lerp } from "@madeja-studio/cepillo";
import { OnPress } from "@madeja-studio/telar";
import chroma from "chroma-js";

interface Props {
  onClose: OnPress;
  scrollOffset: number;
}

export const SettingsHeader = ({ onClose, scrollOffset }: Props) => {
  const { t } = useLingui();
  const colorSwitch = useColorSwitch();

  return (
    <Header
      hasBackButton
      onBackPress={onClose}
      style={tw.style(`ios:mt-4`, {
        borderBottomWidth: 0.5,
        borderColor: chroma(colorSwitch({ dark: "white", light: "ash" })!)
          .alpha(
            clamp(lerp(scrollOffset, { max: 50, min: 10 }), {
              max: 0.15,
              min: 0,
            })
          )
          .hex(),
      })}
      title={t`Settings`}
    />
  );
};
