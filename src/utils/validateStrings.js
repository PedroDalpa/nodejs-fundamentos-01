export function validateStrings(strs) {
  return strs.every((str) => typeof str === 'string' && str.length > 0);
}
