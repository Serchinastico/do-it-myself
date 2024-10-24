import { TSESLint } from "@typescript-eslint/utils";

type MessageIds = "keyboardShouldPersistTaps";

export const keyboardShouldPersistTaps: TSESLint.RuleModule<MessageIds> = {
  create: (context) => ({
    JSXOpeningElement: (node) => {
      if (node.name.type !== "JSXIdentifier") return;
      if (node.name.name !== "ScrollView") return;

      const hasFoundKeyboardShouldPersistTaps = node.attributes.some(
        (attribute) => {
          if (attribute.type !== "JSXAttribute") return false;

          return attribute.name.name === "keyboardShouldPersistTaps";
        }
      );

      if (hasFoundKeyboardShouldPersistTaps) return;

      context.report({ messageId: "keyboardShouldPersistTaps", node });
    },
  }),
  defaultOptions: [],
  meta: {
    fixable: "code",
    messages: {
      keyboardShouldPersistTaps:
        "ScrollView component must define the 'keyboardShouldPersistTaps' property",
    },
    schema: [],
    type: "problem",
  },
};
