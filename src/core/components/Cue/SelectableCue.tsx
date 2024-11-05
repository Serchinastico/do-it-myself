import { ComponentProps } from "react";

import { Cue } from "./Cue";

type Props = {
  isSelected: boolean;
} & ComponentProps<typeof Cue>;

export const SelectableCue = ({ isSelected, ...props }: Props) => {
  return (
    <Cue
      {...props}
      style={tw.style({
        "bg-primary": isSelected,
        "bg-white dark:bg-ash": !isSelected,
      })}
      textStyle={tw.style(`text-center`, {
        "text-white": isSelected,
        "text-white dark:text-white": !isSelected,
      })}
    />
  );
};
