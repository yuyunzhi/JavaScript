// 1、使用Promise实现每隔1秒输出1,2,3
function ajax(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(number);
      resolve(number);

    }, 1000)
  })
}

// 方案 1
// Promise.resolve().then(()=>{
//   return ajax(1)
// }).then(res => {
//   console.log(res)
//   return ajax(2)
// }).then(res => {
//   console.log(res)
//   return ajax(3)
// }).then(res => {
//   console.log(res)
// })

// 方案 2  由1 转变而来
let promiseList = [1,2,3]
promiseList.reduce((p,number,index)=>{
   return p.then(()=>{
     return ajax(number)
   })
},Promise.resolve())





