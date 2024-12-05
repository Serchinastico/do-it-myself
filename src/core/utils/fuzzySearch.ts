import Fuse from "fuse.js";

/**
 * Performs a fuzzy search on an array of objects.
 *
 * The search is conducted on a specified property (key) of each object in the array.
 *
 * @param items An array of objects to search through.
 * @param key The object property to perform the search on.
 * @param search The string to search for.
 * @returns An array of objects that match the search criteria, based on the specified key.
 *
 * @example
 * const products = [
 *   { id: 1, name: 'Apple' },
 *   { id: 2, name: 'Banana' },
 *   { id: 3, name: 'Cucumber' }
 * ];
 *
 * const results = fuzzySearch({
 *   items: products,
 *   key: 'name',
 *   search: 'App'
 * });
 * // results will include the object { id: 1, name: 'Apple' }
 */
export const fuzzySearch = <T extends object>({
  items,
  keys,
  search,
}: {
  items: readonly T[];
  keys: (keyof T)[] | keyof T;
  search: string;
}) => {
  const fuse = new Fuse(items, {
    distance: 100,
    isCaseSensitive: false,
    keys: Array.isArray(keys) ? (keys as string[]) : [keys as string],
    threshold: 0.3,
  });
  console.log(fuse.search(search));
  return fuse.search(search).map((result) => result.item);
};
