import { Extension } from "@tiptap/core";
import { Node, NodeType } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export interface TrailingNodeOptions {
  node: string;
  notAfter: string[];
}

/**
 * Copied from https://github.com/ueberdosis/tiptap/blob/main/demos/src/Experiments/TrailingNode/Vue/trailing-node.ts
 *
 * Extension based on:
 * - https://github.com/ueberdosis/tiptap/blob/v1/packages/tiptap-extensions/src/extensions/TrailingNode.js
 * - https://github.com/remirror/remirror/blob/e0f1bec4a1e8073ce8f5500d62193e52321155b9/packages/prosemirror-trailing-node/src/trailing-node-plugin.ts
 */

function nodeEqualsType({
  node,
  types,
}: {
  node: Node | null;
  types: NodeType | NodeType[];
}) {
  if (node === null) return false;

  return (
    (Array.isArray(types) && types.includes(node.type)) || node.type === types
  );
}

export const TrailingNode = Extension.create<TrailingNodeOptions>({
  addOptions() {
    return {
      node: "paragraph",
      notAfter: ["paragraph"],
    };
  },

  addProseMirrorPlugins() {
    const plugin = new PluginKey(this.name);
    const disabledNodes = Object.entries(this.editor.schema.nodes)
      .map(([, value]) => value)
      .filter((node) => this.options.notAfter.includes(node.name));

    return [
      new Plugin({
        appendTransaction: (_, __, state) => {
          const { doc, schema, tr } = state;
          const shouldInsertNodeAtEnd = plugin.getState(state);
          const endPosition = doc.content.size;
          const type = schema.nodes[this.options.node];

          if (!shouldInsertNodeAtEnd) {
            return;
          }

          return tr.insert(endPosition, type.create());
        },
        key: plugin,
        state: {
          apply: (tr, value) => {
            if (!tr.docChanged) {
              return value;
            }

            const lastNode = tr.doc.lastChild;

            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          },
          init: (_, state) => {
            const lastNode = state.tr.doc.lastChild;

            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          },
        },
      }),
    ];
  },

  name: "trailingNode",
});
