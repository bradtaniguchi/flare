/**
 * Utility function that takes in an array of elements with uid, and
 * and returns a POJO map where the key is the element's uids
 */
export const toMap = (arr: { uid: string }[]) =>
  arr && Array.isArray(arr)
    ? arr.reduce((obj, el) => ({ ...obj, [el.uid]: el }), {})
    : {};
