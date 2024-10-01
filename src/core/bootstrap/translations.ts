import { messages as enMessages } from "@app/locales/en/messages";
import { messages as esMessages } from "@app/locales/es/messages";
import { i18n } from "@lingui/core";
import * as Localization from "expo-localization";

const LOCALES = { en: enMessages, es: esMessages };
const ALLOWED_LOCALES = Object.keys(LOCALES);
const DEFAULT_LOCALE: keyof typeof LOCALES = "en";

Object.entries(LOCALES).forEach(([locale, messages]) => {
  i18n.load(locale, messages);
});

const userLocale = Localization.getLocales()
  .map((locale) => locale.languageCode)
  .find((code) => code && ALLOWED_LOCALES.includes(code));

i18n.activate(userLocale ?? DEFAULT_LOCALE);
