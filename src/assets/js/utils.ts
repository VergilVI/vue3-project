/** 深拷贝
 * @param obj 深拷贝的对象
 */
export function deepCopyFunc<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
