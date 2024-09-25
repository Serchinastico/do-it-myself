import { useSpring } from "@react-spring/native";
import { useEffect, useState } from "react";

interface Props {
  subtitle?: string;
}

export const useHeaderAnimation = ({ subtitle }: Props) => {
  /**
   * We store the text in a state to prevent the subtitle from disappearing
   * while it fades out, effectively preventing the animation
   */
  const [cachedSubtitle, setCachedSubtitle] = useState(subtitle);
  const animatedStyle = useSpring({
    config: { duration: 80 },
    opacity: subtitle ? 1 : 0,
    y: subtitle ? 0 : 1,
  });

  useEffect(() => {
    if (!subtitle) return;

    setCachedSubtitle(subtitle);
  }, [subtitle]);

  return {
    animatedStyle: [
      animatedStyle,
      {
        transform: [{ translateY: animatedStyle.y.to([0, 1], [0, 4]) }],
      },
    ],
    subtitle: cachedSubtitle,
  };
};
