
/**
 * Flatten Array
 *
 * @param {array} arr the array argument
 *
 * @returns {array} flattened array
 */
function flattenArray (arr) {
  if (!Array.isArray(arr)) throw new TypeError('please supply an array as arg')
  if (!arr.length) return arr
  return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flattenArray(b) : b), [])
}

module.exports = {
  flattenArray
}
