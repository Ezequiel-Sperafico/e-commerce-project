import { getTypedObjectKeys } from "./typedObjectKeys";

export function mapOverObject<T extends object, R extends object>(
  obj: T,
  callback: (obj: T[keyof T], key: keyof T) => R,
): { [k in keyof T]: R } {
  const retArr = [];
  for (const k of getTypedObjectKeys(obj)) {
    const iteratorType = typeof obj[k];
    if (iteratorType === "function") retArr.push([k, callback(obj[k], k)]);
  }
  return Object.fromEntries(retArr);
}
