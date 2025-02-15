import { i18n } from "@lingui/core";
import dayjs from "dayjs";

export const formatDate = (rawDate: Date | string) => {
  const now = dayjs();
  const date = dayjs(rawDate);

  const isToday = now.diff(date, "days") < 1 && now.get("D") === date.get("D");
  const isYesterday =
    now.diff(date, "days") < 2 && now.get("D") - 1 === date.get("D");
  const isSameYear = now.diff(date, "years") < 1 && now.year() === date.year();

  if (isToday) {
    return i18n._(`Today`);
  }

  if (isYesterday) {
    return i18n._(`Yesterday`);
  }

  return isSameYear ? date.format("D MMMM") : date.format("YYYY - D MMMM");
};
