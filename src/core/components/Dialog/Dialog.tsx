import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { Dialog as TelarDialog } from "@madeja-studio/telar";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof TelarDialog>;

export const Dialog = ({ children, ...props }: Props) => {
  const colorSwitch = useColorSwitch();

  return (
    <TelarDialog
      contentStyle={tw.style(
        `border-white`,
        {
          backgroundColor: colorSwitch({ dark: "ash", light: "white" }),
        },
        { borderWidth: colorSwitch.colorScheme === "dark" ? 1 : 0 }
      )}
      {...props}
    >
      {children}
    </TelarDialog>
  );
};
