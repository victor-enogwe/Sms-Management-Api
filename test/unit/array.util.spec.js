const { expect, flattenArray } = require('../helpers')

describe('Array Util', () => {
  describe('- Flatten', () => {
    it('should throw a type error is argument is not an array', () => {
      const flattenError = 'please supply an array as arg'
      expect(flattenArray.bind(null)).throws(flattenError)
      expect(flattenArray.bind(null, '')).throws(flattenError)
    })

    it('should flatten an array', () => {
      const nestedArray = [[1, 2, 3, [4, 5, 6, [7, 8, [9]], [10]], [11]], [12]]
      const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      expect(flattenArray([])).to.deep.equal([])
      expect(flattenArray(nestedArray)).to.deep.equal(testArray)
    })
  })
})
