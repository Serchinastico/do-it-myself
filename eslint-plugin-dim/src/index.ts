import { TSESLint } from "@typescript-eslint/utils";

import { keyboardShouldPersistTaps } from "./rules/keyboardShouldPersistTaps.js";

export const rules = {
  "keyboard-should-persist-taps": keyboardShouldPersistTaps,
} satisfies Record<string, TSESLint.RuleModule<string, unknown[]>>;
