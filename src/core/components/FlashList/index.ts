import { FlashList as DefaultFlashList } from "./FlashList";
import { MasonryFlashList } from "./MasonryFlashList";

export const FlashList = Object.assign(DefaultFlashList, {
  Masonry: MasonryFlashList,
});
