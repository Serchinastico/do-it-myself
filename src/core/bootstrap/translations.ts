import { messages as enMessages } from "@app/locales/en/messages";
import { messages as esMessages } from "@app/locales/es/messages";
import { i18n } from "@lingui/core";
import * as Localization from "expo-localization";

const locales = Localization.getLocales().map((locale) => locale.languageCode);
i18n.load("en", enMessages);
i18n.load("es", esMessages);
i18n.activate(locales[0] ?? "en");
