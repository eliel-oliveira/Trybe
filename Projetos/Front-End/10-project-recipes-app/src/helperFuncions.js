/**
 *
 * @param { Object } obj The object to be filtered.
 * @param { Function } predicate A function that accepts up to two arguments.
 *  The filter method calls the predicate function one time for each key in the object.
 *  Returns a new object with the keys (or values) that meet the condition specified in a callback function.
 * @return { Object } Returns a new object.
 */
export function objectFilter(obj, predicate) {
  const result = {};
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (predicate(key, obj[key])) result[key] = obj[key];
  });
  return result;
}

export function objectForEach(obj, predicate) {
  const keys = Object.keys(obj);
  keys.forEach((key) => predicate(key, obj[key]));
}

export const wait = (miliseconds) => new Promise(
  (res) => setTimeout(() => res('test'), miliseconds),
);
