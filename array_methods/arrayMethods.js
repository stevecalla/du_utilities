// let methods = ["map", "sort", "filter", "forEach", "concat", "every", "some", "includes", "join", "reduce", "find", "findIndex", "indexOf", "fill", "slice", "reverse", "push", "pop", "shift", "unshift"];

const methods = {
  map: {
    method: "map",
    use: "Applies a function to each element and returns a new array with the results.",
    numbers: [1, 2, 3, 4],
    doubled: function () {
      const result = this.numbers.map(num => num * 2);
      console.log("map:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: [2, 4, 6, 8],
  },
  sort: {
    method: "sort",
    use: "Sorts the elements of an array in place and returns the sorted array.",
    numbers: [3, 1, 4, 2],
    sorted: function () {
      const result = this.numbers.slice().sort((a, b) => a - b);
      console.log("sort:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: [1, 2, 3, 4],
  },
  filter: {
    method: "filter",
    use: "Creates a new array with all elements that pass the test of a given function.",
    numbers: [1, 2, 3, 4],
    even: function () {
      const result = this.numbers.filter(num => num % 2 === 0);
      console.log("filter:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: [2, 4],
  },
  forEach: {
    method: "forEach",
    use: "Executes a provided function once for each array element.",
    numbers: [1, 2, 3, 4],
    printSquares: function () {
      console.log("forEach:", `Original Array: ${this.numbers}`);
      this.numbers.forEach(num => console.log(num * num));
    },
    expectedOutput: undefined, // Logs: 1, 4, 9, 16
  },
  concat: {
    method: "concat",
    use: "Combines two or more arrays and returns a new array.",
    numbers: [1, 2, 3],
    withMoreNumbers: function () {
      const result = this.numbers.concat([4, 5, 6]);
      console.log("concat:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: [1, 2, 3, 4, 5, 6],
  },
  every: {
    method: "every",
    use: "Checks if all elements in an array pass a test specified by a function.",
    numbers: [2, 4, 6, 8],
    allEven: function () {
      const result = this.numbers.every(num => num % 2 === 0);
      console.log("every:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: true,
  },
  some: {
    method: "some",
    use: "Checks if at least one element in an array passes a test specified by a function.",
    numbers: [1, 2, 3, 4],
    hasEven: function () {
      const result = this.numbers.some(num => num % 2 === 0);
      console.log("some:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: true,
  },
  includes: {
    method: "includes",
    use: "Checks if an array includes a certain element.",
    numbers: [1, 2, 3, 4],
    includesThree: function () {
      const result = this.numbers.includes(3);
      console.log("includes:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: true,
  },
  join: {
    method: "join",
    use: "Joins all elements of an array into a string.",
    numbers: [1, 2, 3, 4],
    joinedString: function () {
      const result = this.numbers.join(", ");
      console.log("join:", `Original Array: ${this.numbers}, Output: "${result}"`);
      return result;
    },
    expectedOutput: "1, 2, 3, 4",
  },
  reduce: {
    method: "reduce",
    use: "Applies a function against an accumulator and each element in the array to reduce it to a single value.",
    numbers: [1, 2, 3, 4],
    sum: function () {
      const result = this.numbers.reduce((acc, curr) => acc + curr, 0);
      console.log("reduce:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: 10,
  },
  find: {
    method: "find",
    use: "Returns the first element in an array that passes a test specified by a function.",
    numbers: [1, 2, 3, 4],
    findEven: function () {
      const result = this.numbers.find(num => num % 2 === 0);
      console.log("find:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: 2,
  },
  findIndex: {
    method: "findIndex",
    use: "Returns the index of the first element in the array that satisfies a provided testing function.",
    numbers: [1, 2, 3, 4],
    findIndexEven: function () {
      const result = this.numbers.findIndex(num => num % 2 === 0);
      console.log("findIndex:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: 1,
  },
  indexOf: {
    method: "indexOf",
    use: "Returns the first index at which a given element can be found in the array, or -1 if it is not present.",
    numbers: [1, 2, 3, 4],
    indexOfTwo: function () {
      const result = this.numbers.indexOf(2);
      console.log("indexOf:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: 1,
  },
  fill: {
    method: "fill",
    use: "Changes all elements in an array to a static value.",
    numbers: [1, 2, 3, 4],
    filledWithZeros: function () {
      const result = this.numbers.fill(0);
      console.log("fill:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: [0, 0, 0, 0],
  },
  slice: {
    method: "slice",
    use: "Returns a shallow copy of a portion of an array into a new array object.",
    numbers: [1, 2, 3, 4],
    sliced: function () {
      const result = this.numbers.slice(1, 3);
      console.log("slice:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: [2, 3],
  },
  reverse: {
    method: "reverse",
    use: "Reverses the order of elements in an array in place.",
    numbers: [1, 2, 3, 4],
    reversed: function () {
      const result = this.numbers.slice().reverse();
      console.log("reverse:", `Original Array: ${this.numbers}, Output: ${result}`);
      return result;
    },
    expectedOutput: [4, 3, 2, 1],
  },
  push: {
    method: "push",
    use: "Adds one or more elements to the end of an array and returns the new length of the array.",
    numbers: [1, 2, 3],
    addedFour: function () {
      this.numbers.push(4);
      console.log("push:", `Original Array: ${this.numbers}, Output: ${this.numbers}`);
      return this.numbers;
    },
    expectedOutput: [1, 2, 3, 4],
  },
  pop: {
    method: "pop",
    use: "Removes the last element from an array and returns that element.",
    numbers: [1, 2, 3],
    removedLast: function () {
      this.numbers.pop();
      console.log("pop:", `Original Array: ${this.numbers}, Output: ${this.numbers}`);
      return this.numbers;
    },
    expectedOutput: [1, 2],
  },
  shift: {
    method: "shift",
    use: "Removes the first element from an array and returns that element.",
    numbers: [1, 2, 3],
    removedFirst: function () {
      this.numbers.shift();
      console.log("shift:", `Original Array: ${this.numbers}, Output: ${this.numbers}`);
      return this.numbers;
    },
    expectedOutput: [2, 3],
  },
  unshift: {
    method: "unshift",
    use: "Adds one or more elements to the beginning of an array and returns the new length of the array.",
    numbers: [2, 3, 4],
    addedOne: function () {
      this.numbers.unshift(1);
      console.log("unshift:", `Original Array: ${this.numbers}, Output: ${this.numbers}`);
      return this.numbers;
    },
    expectedOutput: [1, 2, 3, 4],
  },
};


methods.map.doubled();
methods.sort.sorted();
methods.filter.even();
methods.forEach.printSquares(); // Logs: 1, 4, 9, 16
methods.concat.withMoreNumbers();
methods.every.allEven();
methods.some.hasEven();
methods.includes.includesThree();
methods.join.joinedString();
methods.reduce.sum();
methods.find.findEven();
methods.findIndex.findIndexEven();
methods.indexOf.indexOfTwo();
methods.fill.filledWithZeros();
methods.slice.sliced();
methods.reverse.reversed();
methods.push.addedFour();
methods.pop.removedLast();
methods.shift.removedFirst();
methods.unshift.addedOne();


