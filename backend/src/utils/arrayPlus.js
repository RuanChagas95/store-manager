class ArrayPlus extends Array {
  first(callback) {
    for (let i = 0; i < this.length; i += 1) {
      const result = callback(this[i]);
      if (result) {
        return result;
      }
    }
  }
}
  
// example:
// const arr = new ArrayPlus(1, 2, { message: 'foo' }, 4, 5); 
// console.log(arr.first((curr) => (typeof curr === 'object' ? curr.message : null)));
  
module.exports = ArrayPlus;