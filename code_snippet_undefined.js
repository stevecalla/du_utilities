// let obj = {
//   name: "first last",
//   printName: () => {
//     console.log(this.name);
//   },
// };

// obj.printName(); //undefined

function obj2() {
  let name = "first last";
  console.log(name)
  printName = () => {
    console.log(name)
  };
};

obj2();
obj2.printName(); //undefined