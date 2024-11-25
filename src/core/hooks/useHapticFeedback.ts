import { atoms } from "@app/core/storage/state";
import { useAtomValue } from "jotai";

export const useHapticFeedback = () => {
  const isHapticFeedbackEnabled = useAtomValue(atoms.isHapticFeedbackEnabled);

  return { isHapticFeedbackEnabled };
};
