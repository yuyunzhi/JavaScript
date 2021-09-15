const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'RECJECTED'
const isFunction = variable => typeof variable === 'function'

class MyPromise {
  constructor(executor){

    this._status = PENDING
    this._value = undefined
    this._rejectedQueues = []
    this._fulfilledQueues = []

    try{
      executor(this._resolve.bind(this),this._reject.bind(this))
    }catch (error){
      this._reject(error)
    }
  }

  _resolve(value){
    if(this._status !== PENDING) return
    this._value = value
    this._status = FULFILLED

    while(this._fulfilledQueues.length>0){
      const cb = this._fulfilledQueues.shift()
      cb(value)
    }
  }

  _reject(value){
    if(this._status !== PENDING) return
    this._value = value
    this._status = REJECTED

    while(this._rejectedQueues.length>0){
      const cb = this._rejectedQueues.shift()
      cb(value)
    }
  }

  then(onFulfilled,onRejected){
    const p1 =  new MyPromise((onFulfilledNext,onRejectedNext)=>{


      // 链式.then 要考虑的 onFulfilled onFulfilledNext
      // onFulfilled 不为函数，则调用 onFulfilledNext()
      // onFulfilled 为函数，则调用 onFulfilled 得到返回值res
            // res 为 promise 则 res.then(onFulfilledNext,onRejectedNext)
            // res 不为 promise 则  onFulfilledNext()
      // 报错用try catch拦截

      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res =  onFulfilled(value);
            console.log('res',res);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }


      switch (this._status){
        case "REJECTED":
          rejected(this._value)
          break
        case "FULFILLED":
          fulfilled(this._value)
          break
        default:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
      }
    })
    return p1
  }

  static resolve(value){
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  static reject(){
    return new MyPromise((resolve ,reject) => reject(value))
  }

  catch(){

  }

  static all(list){
    let result = []
    let count = 0
    return new MyPromise((resolve ,reject)=>{
      for(let key in list){
        MyPromise.resolve(list[key]).then(res=>{
          result[key] = res
          count++
          if(count === list.length){
            resolve(result)
          }
        },err=>{
          reject(err)
        })

      }

    })
  }

  static race(list){
      return new MyPromise((resolve,reject)=>{
        for(let key in list){
          this.resolve(list[key]).then(res=>{
            resolve(res)
          },err=>{
            reject(err)
          })
        }
      })
  }
}

function x(data){
  return new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(data)
    },1000)
  })
}

function x2(data){
  return new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(data)
    },2000)
  })
}

function x3(data){
  return new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(data)
    },800)
  })
}
function x4(data){
  return new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(data)
    },4000)
  })
}

// 例子 1 .then
// x(2222).then(res=>{
//   console.log('1success',res);
//   return res
// },err=>{
//   console.log('1error',err);
// })

// 例子2 .then.then
// x(2222).then(res=>{
//   console.log('1success',res);
//   return res
// },err=>{
//   console.log('1error',err);
// }).then(res=>{
//   console.log('2success',res);
//   return res
// },err=>{
//   console.log('2error',err);
// })

// 例子3 resolve
// MyPromise.resolve(x(666)).then(res=>{
//   console.log('例子 3 reslove',res);
// })

// MyPromise.resolve(x(8888)).then(res=>{
//   console.log('例子 3 reslove',res);
// })

// 例子4 race
// MyPromise.race([x(1),x2(2),x3(3),x4(4)]).then(res=>{
//   console.log('例子4 race result',res);
// },err=>{
//   console.log('例子4,onRejected err',err);
// })

// 例子5 all
// MyPromise.all([x(1),x2(2),x3(3),x4(4)]).then(res=>{
//   console.log('例子5 all result',res);
// },err=>{
//   console.log('例子5 all,onRejected err',err);
// })


// 例子 6 取消promise ,每一个.then都是新的promise的then
MyPromise.resolve().then(() => {
  console.log('ok1')
  return new MyPromise(()=>{})  // 返回“pending”状态的Promise对象
}).then(() => {
  // 后续的函数不会被调用
  console.log('ok2')
}).catch(err => {
  console.log('err->', err)
})

