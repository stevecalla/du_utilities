function hello() {
  console.log('hello');
}

// hello();

function loop() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
};

// loop();

function sayHi(fullName, callback) {
  console.log(`hi, ${fullname}!`);
  if (typeof callback === 'function') {
    callback();
  }
}

function sayBye(fullName, callback) {
  console.log(`bye, ${fullname}!`);
  callback();
}

function printMessage(firstName, lastName, callback) {
  const fullName = `${firstName} ${lastName}`;
  if (typeof callback === 'function') {
    callback(fullName);
  }
}

// printMessage("john", "doe", x => console.log(x))
// printMessage("john", "doe", sayyouknownothing)
// printMessage("john", "doe", sayHi)
// printMessage("john", "doe", sayBye)

const x = {};
x['foo'] = 'bar';
x.bar = {
  'first': 100,
  'second': 200,
}
// console.log(x.bar['first'] + x['bar'].second);

// printNum(150);

// function printNum() {
//   console.log(num);
//   var num = 5;
// }

//undefined

// class Guitar {
//   constructor(color, stringNumber) {
//     this.color = color;
//     this.stringNumber = stringNumber;
//     this.play = () => console.log("guitar");
//   }
// }

// class Bass extends Guitar {
//   constructor(color) {
//     super(color, 4);
//     this.play = () => console.log("bass")
//   }
// }

// class Electric extends Guitar {
//   constructor(color) {
//     super(color, 6);
//   }
// }
// Electric.prototype.play = () => console.log("electric")

// const guitars = [];
// guitars[0] = new Guitar("black");
// guitars[1] = new Guitar("green");
// guitars[2] = new Guitar("red");

// for (let i = 0; i < 3; ++i) {
//   guitars[i].play();
// }


// function Foo(bar) {
//   this.a = bar;
//   this.b = new Array(bar[0], bar[1], bar[2]);
// }

// const bar = [10, 10, 10];
// const zzz = new Foo(bar);

// bar[0] = 100;
// bar[3] = 100;

// const qux = bar[0] + zzz.a[3] + zzz.b[0];

// console.log(qux)


// const Pair = function(first, second) {
//   this.first = first;
//   this.second = second;
// }

// Pair.prototype.setFirst = function(newFirst) {
//   this.first = newFirst;
//   return this;
// }

// Pair.prototype.setSecond = function(newSecond) {
//   this.second = newSecond;
//   return this;
// }

// const arr = [];
// arr[0] = new Pair("first", "second");
// arr[1] = arr[0].setFirst("second");
// arr[2] = arr[1].setSecond("first");
// if (arr[0] === arr[1] || arr[0] === arr[2] || arr[1] === array[2]) {
//   arr[0].setSecond("second").setFirst("first")
// } else {
//   arr[1].setFirst("third").setSecond("thirrd")
// }

// console.log(arr[0].first);
// console.log(arr[2].second)


// const obj = {
//   sum: 0,
//   addMultiple(numbers) {
//     numbers.forEach(function (x) {
//       this.sum += x;
//     })
//   }
// };

// console.log(obj.addMultiple(2));

// function math(operation, x) {
//   const OPERATIONS = {
//     '*': (a, b) => a*b,
//     '/': (a, b) => a/b,
//     '+': (a, b) => a+b,
//     '-': (a, b) => a-b,
//   }

//   return function(y) {
//     return OPERATIONS[operation] (x,y);
//   }
// }

// const mul = math("*", 5);
// const add = math("+", mul(2));

// console.log(typeof add);
// console.log(add(math("-", 25)(20)))

// function calculate(arr, msg) {
//   arr[1]=150;
//   msg="inside"
//   console.log(arr[0] + arr[1])
//   console.log(msg)
// }

// const arr = [100]
// let msg = "outside"

// calculate(arr,msg)

// console.log(arr[0] + arr[1])
// console.log(msg)

var bar = 5;
function foo(bar) {
  if (bar >= 5) {
    bar = "zzz";
  } else {
    let bar = "qux";
  }
  console.log(bar)
}

foo(2);
foo(6);
console.log(bar)

