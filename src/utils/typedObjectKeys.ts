export function getTypedObjectKeys<T extends object>(entry: T): Array<keyof T> {
  return Object.keys(entry) as Array<keyof T>;
}
