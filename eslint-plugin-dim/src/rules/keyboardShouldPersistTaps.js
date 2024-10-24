"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyboardShouldPersistTaps = void 0;
exports.keyboardShouldPersistTaps = {
    create: (context) => ({
        JSXOpeningElement: (node) => {
            if (node.name.type !== "JSXIdentifier")
                return;
            if (node.name.name !== "ScrollView")
                return;
            const hasFoundKeyboardShouldPersistTaps = node.attributes.some((attribute) => {
                if (attribute.type !== "JSXAttribute")
                    return false;
                return attribute.name.name === "keyboardShouldPersistTaps";
            });
            if (hasFoundKeyboardShouldPersistTaps)
                return;
            context.report({ messageId: "keyboardShouldPersistTaps", node });
        },
    }),
    defaultOptions: [],
    meta: {
        fixable: "code",
        messages: {
            keyboardShouldPersistTaps: "ScrollView component must define the 'keyboardShouldPersistTaps' property",
        },
        schema: [],
        type: "problem",
    },
};
//# sourceMappingURL=keyboardShouldPersistTaps.js.map