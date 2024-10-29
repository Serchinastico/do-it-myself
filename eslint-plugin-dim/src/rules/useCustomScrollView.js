"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCustomScrollView = void 0;
exports.useCustomScrollView = {
    create: (context) => ({
        ImportDeclaration: (node) => {
            if (node.source.value !== "react-native")
                return;
            const scrollViewImport = node.specifiers.find((clause) => clause.local.name === "ScrollView");
            if (!scrollViewImport)
                return;
            context.report({
                fix: (fixer) => {
                    const importDeclaration = context.sourceCode.getText(node);
                    const newReactNativeImportDeclaration = importDeclaration.replace(/ ScrollView,? /, "");
                    return fixer.replaceText(node, `${newReactNativeImportDeclaration}\nimport { ScrollView } from "@app/core/components/ScrollView";`);
                },
                loc: scrollViewImport.loc,
                messageId: "useCustomScrollView",
                node,
            });
        },
    }),
    defaultOptions: [],
    meta: {
        docs: {
            description: "Disallow import of ScrollView from react-native",
        },
        fixable: "code",
        messages: {
            useCustomScrollView: `Use ScrollView from "@app/core/components/ScrollView" instead of importing from "react-native".`,
        },
        schema: [],
        type: "problem",
    },
};
//# sourceMappingURL=useCustomScrollView.js.map