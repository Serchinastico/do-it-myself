import { Plugin, PluginKey } from "@tiptap/pm/state";

/**
 * Creates a ProseMirror Plugin that prevents deletion of nodes with a specific name.
 *
 * The plugin filters each transaction to ensure that no node with the provided `nodeName`
 * is replaced or deleted within the document. If such a node is found in the transaction
 * steps, the transaction is stopped.
 *
 * {@link https://github.com/ueberdosis/tiptap/issues/181#issuecomment-1213455982}
 *
 * @param nodeName The name of the node type to be protected from deletion.
 * @returns A ProseMirror Plugin instance that prevents deletion of specified nodes.
 *
 * @example
 * const myPlugin = doNotDeletePlugin("protectedNode");
 * editorState = EditorState.create({
 *   doc: mySchema.node("doc", null, mySchema.node("protectedNode")),
 *   plugins: [myPlugin]
 * });
 */
export const doNotDeletePlugin = (nodeName: string) => {
  return new Plugin({
    filterTransaction: (transaction, state) => {
      let result = true; // true for keep, false for stop transaction
      const replaceSteps: number[] = [];
      transaction.steps.forEach((step, index) => {
        // @ts-ignore
        if (step.jsonID === "replace") {
          replaceSteps.push(index);
        }
      });

      replaceSteps.forEach((index) => {
        const map = transaction.mapping.maps[index];
        // @ts-ignore
        const oldStart = map.ranges[0];
        // @ts-ignore
        const oldEnd = map.ranges[0] + map.ranges[1];
        state.doc.nodesBetween(oldStart, oldEnd, (node) => {
          if (node.type.name === nodeName) {
            result = false;
          }
        });
      });
      return result;
    },
    key: new PluginKey("do-not-delete"),
  });
};
