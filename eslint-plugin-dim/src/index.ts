import { TSESLint } from "@typescript-eslint/utils";

import { useCustomScrollView } from "./rules/useCustomScrollView";

export const rules = {
  "use-custom-scroll-view": useCustomScrollView,
} satisfies Record<string, TSESLint.RuleModule<string, unknown[]>>;
