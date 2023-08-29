// 𝐏𝐫𝐨𝐦𝐢𝐬𝐞.𝐚𝐥𝐥() 𝐯𝐬 𝐏𝐫𝐨𝐦𝐢𝐬𝐞.𝐫𝐚𝐜𝐞() in #javascript

// 💻 𝐏𝐫𝐨𝐦𝐢𝐬𝐞.𝐚𝐥𝐥() is a method in JavaScript that takes an array of promises and returns a new promise that contains an array of resolved values of all the promises when they all have resolved. If any of the promises are rejected, the returned promise is rejected immediately without waiting for the remaining promises to complete.

// 🔁 On the other hand, 𝐏𝐫𝐨𝐦𝐢𝐬𝐞.𝐫𝐚𝐜𝐞() takes an array of promises and returns a single promise that resolves with the value of the first promise that resolves or rejects. The returned promise is settled as soon as any of the promises in the array is settled.

//Promise.all()
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
// const promise3 = Promise.resolve(3);
const promise3 = new Promise((resolve, reject) => {
  resolve (3);
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
  // try {
  //   console.log(values); //output [1,2,3]
    
  // } catch (error) {
  //   console.log("error: " + error);
  // }
}, console.log('error handle error reject'));

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

//promise race
const promise_1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise 1');
  }, 2000);
});

const promise_2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promise 2');
  }, 1000);
});

Promise.race([promise_1, promise_2]).then((value) => {
  console.log('promise race-----------')
  console.log('promise race output= ' + value); //output = 'Promise 2'; b/c promise_2 finishes in 1 sec while promise_1 takes 2 secs
  console.log('promise race end-----------\n')
});

//promise all settled
Promise.allSettled([promise1, promise2, promise3]).then((values) => {
  console.log(`all settled #1-------`); 
  console.log(values); 
  values.map(value => console.log(value.value));
  console.log(`all settled #1 end-------\n`); 
});

Promise.allSettled([promise_1, promise_2]).then((values) => {
  console.log(`all settled #2 -------`); 
  console.log('promise allsettled output= ' + values); //output returns object as such [{status: 'fullfilled', value: 'Promise 1'}, {status: 'fullfilled', value: 'Promise 2'}]
  //waits for both promises to resolve; returns object of results
  values.map(value => console.log(value.value));
  console.log(`all settled #2 end-------`); 
});



