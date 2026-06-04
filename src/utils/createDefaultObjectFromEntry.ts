export type TAnyPrimitive = string | number | boolean | symbol;

interface IEntryData {
  [k: string]: unknown;
}

export function createDefaultObjectFromEntry<E extends IEntryData, D>(
  entry: E,
  defaultValue: D | (() => D),
) {
  return Object.fromEntries(
    (Object.keys(entry) as (keyof E)[]).map((k) => [
      k,
      typeof defaultValue === "function"
        ? (defaultValue as () => D)()
        : defaultValue,
    ]),
  ) as { [K in keyof E]: D };
}
