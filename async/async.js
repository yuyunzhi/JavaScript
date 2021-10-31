
// await fn() ,
// console.log(1)
// 按顺序执行fn里的同步代码，遇到宏任务或微任务分别加入队列。执行完fn里所有可以执行的同步代码后，才会执行console.log(1)

// 例子1
// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }
//
// async function async2() {
//   setTimeout(() => {
//     console.log('timer')
//   }, 0)
//   console.log("async2");
// }
// async1();
// console.log("start")

// 例子2
// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
//   setTimeout(() => {
//     console.log('timer1')
//   }, 0)
// }
// async function async2() {
//   setTimeout(() => {
//     console.log('timer2')
//   }, 0)
//   console.log("async2");
// }
// async1();
// setTimeout(() => {
//   console.log('timer3')
// }, 0)
// console.log("start")

// 例子3 async 的函数返回值就是promise.resolve(xxx)
// async function fn () {
//   // return await 1234
//   // 等同于
//   return 123
// }
// fn().then(res => console.log(res))

// 例子 4
 // 在async1中await后面的Promise是没有返回值的，
// 也就是它的状态始终是pending状态，
// 因此相当于一直在await，await，await却始终没有响应...所以后面不会执行

// async function async1 () {
//   console.log('async1 start');
//   await new Promise(resolve => {
//     console.log('promise1')
//   })
//   console.log('async1 success');
//   return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => console.log(res))
// console.log('srcipt end')

//同上
// const async1 = async () => {
//   console.log('async1');
//   setTimeout(() => {
//     console.log('timer1')
//   }, 2000)
//   await new Promise(resolve => {
//     console.log('promise1')
//     resolve('x')
//   })
//   console.log('async1 end')
//   return 'async1 success'
// }
// console.log('script start');
// async1().then(res => console.log(res));
// console.log('script end');
// Promise.resolve(1)
//     .then(2)
//     .then(Promise.resolve(3))
//     .catch(4)
//     .then(res => console.log(res))
// setTimeout(() => {
//   console.log('timer2')
// }, 1000)



// *例子 5  await 含promise resolve then
// 微任务队列为，先执行promise的executor,然后把promise.then加入队列 微任务1，，然后再把await后面的代码加入队列为微任务2
// async function async1 () {
//   console.log('async1 start');
//   await new Promise(resolve => {
//     console.log('promise1')
//     resolve('promise1 resolve')
//   }).then(res => console.log(res))
//   console.log('async1 success');
//   return 'async1 end'
// }
// console.log('srcipt start')
// async1().then(res => console.log(res))
// console.log('srcipt end')

//例子6 字节

// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }
//
// async function async2() {
//   console.log("async2");
// }
//
// console.log("script start");
//
// setTimeout(function() {
//   console.log("setTimeout");
// }, 0);
//
// async1();
//
// new Promise(function(resolve) {
//   console.log("promise1");
//   resolve();
// }).then(function() {
//   console.log("promise2");
// });
// console.log('script end')

// 例子 7 在async中，如果 await后面的内容是一个异常或者错误的话，会怎样呢？
// await后面跟着的是一个状态为rejected的promise
// async function async1 () {
//   await async2();
//   console.log('async1');
//   return 'async1 success'
// }
//
// async function async2 () {
//   return new Promise((resolve, reject) => {
//     console.log('async2')
//     reject('errorx')
//   })
// }
// async1().then(res => console.log(res)).catch(err=>{console.log(err)})

// 换成 throw new Error('error!!!') 一样
// async function async1 () {
//   console.log('async1');
//   throw new Error('error!!!')
//   return 'async1 success'
// }
// async1().then(res => console.log(res))

