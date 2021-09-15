const isFunction = variable => typeof variable === 'function'

const PENDING = 'pending' // 等待状态
const FULFILLED = 'fulfilled' // 成功状态
const REJECTED = 'rejected' // 失败状态
/**
 * then可能返回的是普通值,也可能返回一个promise
 * @param {*} promise 当前promise
 * @param {*} x 当前返回值
 * @param {*} resolve 成功回调
 * @param {*} reject 失败回调
 * @returns
 */
const resolvePromise = (promise, x, resolve, reject) => {
  if (promise === x) {
    return reject(new TypeError('检测到promise的循环调用')) // 'Chaining cycle detected for promise #<Promise>'
  }
  let called = false
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
            x,
            (y) => {
              if (called) return
              called = true
              resolvePromise(promise, y, resolve, reject)
            },
            (r) => {
              if (called) return
              called = true
              reject(r)
            }
        )
      } else {
        resolve(x)
      }
    } catch (err) {
      if (called) return
      called = true
      reject(err)
    }
  } else {
    resolve(x)
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PENDING // 初始化状态
    this.value = undefined // 成功的数据
    this.reason = undefined // 失败的原因
    this.onFulfilledCallbacks = [] // 保存成功状态的回调队列
    this.onRejectCallbacks = [] // 保存失败状态的回调队列

    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }
  _reject(err){
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = err
    }

    while(this.onRejectCallbacks.length>0){
      const cb = this.onRejectCallbacks.shift()
      cb(err)
    }

  }
  _resolve(data){
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = data
    }

    while(this.onFulfilledCallbacks.length>0){
      const cb = this.onFulfilledCallbacks.shift()
      cb(data)
    }

  }

  // then(onFulfilled, onRejected) {
  //   // 值穿透问题 如果then是空的话,就手动的将上一个resolve的值带入到下一个then中
  //   onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (value) => value
  //   onRejected =
  //       typeof onRejected == 'function'
  //           ? onRejected
  //           : (err) => {
  //             throw err
  //           }
  //   const { value, status } = this
  //
  //   return new MyPromise((onFulfilledNext, onRejectedNext)=>{
  //     console.log('走了 then new promise');
  //     // 封装一个成功时执行的函数
  //     let fulfilled = value => {
  //       try {
  //         if (!isFunction(onFulfilled)) {
  //           onFulfilledNext(value)
  //         } else {
  //           let res =  onFulfilled(value);
  //           if (res instanceof MyPromise) {
  //             // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
  //             res.then(onFulfilledNext, onRejectedNext)
  //           } else {
  //             //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
  //             onFulfilledNext(res)
  //           }
  //         }
  //       } catch (err) {
  //         // 如果函数执行出错，新的Promise对象的状态为失败
  //         onRejectedNext(err)
  //       }
  //     }
  //     // 封装一个失败时执行的函数
  //     let rejected = error => {
  //       try {
  //         if (!isFunction(onRejected)) {
  //           onRejectedNext(error)
  //         } else {
  //           let res = onRejected(error);
  //           if (res instanceof MyPromise) {
  //             // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
  //             res.then(onFulfilledNext, onRejectedNext)
  //           } else {
  //             //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
  //             onFulfilledNext(res)
  //           }
  //         }
  //       } catch (err) {
  //         // 如果函数执行出错，新的Promise对象的状态为失败
  //         onRejectedNext(err)
  //       }
  //     }
  //     console.log('_status', status);
  //     switch (status) {
  //         // 当状态为pending时，将then方法回调函数加入执行队列等待执行
  //       case PENDING:
  //         this.onFulfilledCallbacks.push(fulfilled)
  //         this.onRejectCallbacks.push(rejected)
  //         break
  //         // 当状态已经改变时，立即执行对应的回调函数
  //       case FULFILLED:
  //         fulfilled(value)
  //         break
  //       case REJECTED:
  //         rejected(value)
  //         break
  //     }
  //   })
  //
  // }


  then(onFulfilled, onRejected) {
    // 值穿透问题 如果then是空的话,就手动的将上一个resolve的值带入到下一个then中
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (value) => value
    onRejected =
        typeof onRejected == 'function'
            ? onRejected
            : (err) => {
              throw err
            }
    return new MyPromise((resolve, reject) => {
      console.log('this.status',this.status);
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const res = onFulfilled(this.value)
            resolvePromise(MyPromise, res, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(MyPromise, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(MyPromise, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(MyPromise, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
      }
    })
  }

}

/**
 * 实现resolve
 * @param {*} data
 * @returns
 */

MyPromise.resolve = function (value){
  // 如果参数是MyPromise实例，直接返回这个实例
  if (value instanceof MyPromise) return value
  return new MyPromise(resolve => resolve(value))
}

/**
 * 实现reject
 * @param {*} data
 * @returns
 */
MyPromise.reject = function (data) {
  return new MyPromise((resolve, reject) => {
    reject(data)
  })
}

/**
 * 失败回调,因为是实例化后的,所以需要挂载在原型
 * @param {Function} errCallback
 * @returns
 */
MyPromise.prototype.catch = function (errCallback) {
  return this.then(null, errCallback)
}

/**
 * 不论成功失败的回调
 * @param {*} callBack
 * @returns
 */
MyPromise.prototype.finally = function (callBack) {
  return this.then(
      (data) => {
        return MyPromise.resolve(callBack()).then(() => data)
      },
      (err) => {
        return MyPromise.reject(callBack()).then(() => {
          throw err
        })
      }
  )
}

/**
 * 同时执行多个promise,但是最返回最先返回的结果
 * @param {*} promiseList
 * @returns
 */

MyPromise.race = function (list){
  return new MyPromise((resolve,reject)=>{
    for(let key in list){
      this.resolve(list[key]).then(res=>{
        console.log(6666,res);
        resolve(res)
      },err=>{
        reject(err)
      })
    }
  })
}
/**
 * 同时执行多个promise,会等待每次promise的结果,最后一起返回,有一个失败,这都不会返回
 * @param {} promiseList
 * @returns
 */
MyPromise.all = function (promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new TypeError('必须是数组')
  }
  let result = []
  let count = 0
  return new MyPromise((resolve ,reject)=>{
    for(let key in promiseList){
      this.resolve(promiseList[key]).then(res=>{
        result[key] = res
        count++
        if(count === promiseList.length){
          resolve(result)
        }
      },err=>{
        reject(err)
      })
    }
  })
}

/**
 * any与all完全相反,只要有个一个成功就会返回成功,全部失败才会返回失败
 * @param {*} promiseList
 * @returns
 */
MyPromise.any = function (promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new TypeError('必须是数组')
  }
  return new MyPromise((resolve, reject) => {
    const resultArr = []
    const len = promiseList.length
    let currentIndex = 0
    const getResult = (index, err) => {
      resultArr[index] = err
      if (++currentIndex === len) {
        reject(resultArr)
      }
    }
    promiseList.map((res, index) => {
      if (res && typeof res.then == 'function') {
        res.then(resolve, (err) => {
          getResult(index, err)
        })
      } else {
        resolve(res)
      }
    })
  })
}

/**
 * 保存所有的成功与失败
 * @param {*} promiseList
 * @returns
 */
MyPromise.allSettled = function (promiseList) {
  if (!Array.isArray(promiseList)) {
    throw new TypeError('必须是数组')
  }
  return new MyPromise((resolve, reject) => {
    const resultArr = []
    const len = promiseList.length
    let currentIndex = 0
    const getResult = (index, data, status) => {
      if (status === FULFILLED) {
        resultArr.push({
          status: status,
          value: data,
        })
      }
      if (status === REJECTED) {
        resultArr.push({
          status: status,
          reason: data,
        })
      }
      if (++currentIndex === len) {
        resolve(resultArr)
      }
    }
    promiseList.map((res, index) => {
      if (res && typeof res.then == 'function') {
        res.then(
            (data) => {
              getResult(index, data, FULFILLED)
            },
            (err) => {
              getResult(index, err, REJECTED)
            }
        )
      } else {
        getResult(index, res, FULFILLED)
      }
    })
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

function y(data){
  return new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(data)
    },100)
  })
}


function x(data){
  return new MyPromise((resolve,reject)=>{
    setTimeout(()=>{
      if(Math.random()>0.5){
        resolve(data)
      }else{
        reject('error ' +data)
      }
    },1000)
  })
}


// 例子 1 .then
// x(2222).then(res=>{
//   console.log('1 success',res);
//   return  parseInt(Math.random()*100,10)
// },err=>{
//   console.log('1 error',err);
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
// MyPromise.resolve(y(666)).then(res=>{
//   console.log('例子 3 reslove',res);
// })
//
// MyPromise.resolve(y(8888)).then(res=>{
//   console.log('例子 3 reslove',res);
// })

// 例子4 race
// MyPromise.race([x2(2),x3(3),x4(4)]).then(res=>{
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
// MyPromise.resolve().then(() => {
//   console.log('ok1')
//   return new MyPromise(()=>{})  // 返回“pending”状态的Promise对象
// }).then(() => {
//   // 后续的函数不会被调用
//   console.log('ok2')
// }).catch(err => {
//   console.log('err->', err)
// })


// 例子7 promise2为什么是pending?
const promise1 = new MyPromise((resolve, reject) => {
  // console.log('promise1')
  resolve('resolve1')
})
const promise2 = promise1.then(res => {
  console.log(res)
})
// console.log('1', promise1);
console.log('2', promise2);

