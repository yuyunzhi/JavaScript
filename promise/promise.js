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
    // 如果是普通的值，就直接调用resolve
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

  _reject(err) {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = err

      while (this.onRejectCallbacks.length > 0) {
        const cb = this.onRejectCallbacks.shift()
        cb(err)
      }
    }


  }

  _resolve(data) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = data

      while (this.onFulfilledCallbacks.length > 0) {
        const cb = this.onFulfilledCallbacks.shift()
        cb(data)
      }
    }
  }

  then(onFulfilled, onRejected) {
    // 值穿透问题 如果then是空的话,就手动的将上一个resolve / reject 的值带入到下一个then中
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : (value) => value
    onRejected =
        typeof onRejected == 'function'
            ? onRejected
            : (err) => {
              throw err
            }
    return new MyPromise((resolve, reject) => {
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
            console.log('err reason', err);
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

MyPromise.resolve = function (value) {
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

MyPromise.race = function (list) {
  return new MyPromise((resolve, reject) => {
    for (let key in list) {
      list[key].then(res => {
        resolve(res)
      }, err => {
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
  return new MyPromise((resolve, reject) => {
    for (let key in promiseList) {
      promiseList[key].then(res => {
        result[key] = res
        count++
        if (count === promiseList.length) {
          resolve(result)
        }
      }, err => {
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

    promiseList.map((res, index) => {
      if (res && typeof res.then == 'function') {
        res.then(resolve, (err) => {
          resultArr[index] = err
          if (++currentIndex === len) {
            reject(resultArr)
          }
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
      if (res && typeof res.then === 'function') {
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


function x2(data) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}

function x3(data) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 800)
  })
}

function x4(data) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 4000)
  })
}

function y(data) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 100)
  })
}


function x(data) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(data)
      } else {
        reject('error ' + data)
      }
    }, 1000)
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


// 例子 6 取消promise
// 为什么 return new MyPromise(()=>{}) 之后 就不会执行后面的代码了
// ,每一个.then都是新的promise的then
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
// 因为 先执行同步代码，所以promise2是pending状态
// const promise1 = new MyPromise((resolve, reject) => {
//   console.log('promise1')
//   resolve('resolve1')
// })
// const promise2 = promise1.then()
// console.log('1', promise1);
// console.log('2', promise2);

// 例子 8
// catch不管被连接到哪里，都能捕获上层未捕捉过的错误。
// 至于then3也会被执行，那是因为catch()也会返回一个Promise，且由于这个Promise没有返回值，所以打印出来的是undefined

// const promise = new MyPromise((resolve, reject) => {
//   reject("error6666");
//   resolve("success2");
// });
// promise
//     .then(res => {
//       console.log(": ", res);
//     }).then(res => {
//   console.log("then2: ", res);
// }).catch(err => {
//   console.log("catch: ", err);
//   return '哈哈'
// }).then(res => {
//   console.log("then3: ", res);
// })

// 例子9 值透传
// 为什么第二then拿到的是第一then的 2？
// 因为catch 实际是没有第一个参数函数的then，所以会值透传
// MyPromise.resolve(666)
//     .then(res => {
//       console.log(res);
//       return 2;
//     })
//     .catch(err => {
//       return 3;
//     })
//     .then(res => {
//       console.log(res);
//     },err=>{
//       console.log('3 then err',err);
//     });

// 例子10 值透传
// 为什么catch之后继续走then ,因为返回的是then
// MyPromise.reject(1)
//     .then(res => {
//       console.log(res);
//       return 2;
//     })
//     .catch(err => {
//       console.log(err);
//       return 3
//     })
//     .then(res => {
//       console.log(res);
//     });

// 例子11 为什么res打出来的都是success
// 因为为是同一个promise,resolve的参数修改了就不能改变了
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('timer')
//     resolve('success')
//   }, 1000)
// })
// const start = Date.now();
// promise.then(res => {
//   console.log(res, Date.now() - start)
// })
// promise.then(res => {
//   console.log(res, Date.now() - start)
// })

// 例子12 为什么 return new Error 不会被catch捕获？
// return 任何非promise的xxx 都会被包裹 promise.resolve(xxx)

// MyPromise.resolve().then(() => {
//   return new Error('error!!!')
// }).then(res => {
//   console.log("then: ", res)
// }).catch(err => {
//   console.log("catch: ", err)
// })

// 例子13 为什么打印1
// 因为 then 希望接受函数，否则会透传
// MyPromise.resolve(1)
//     .then(2)
//     .then(Promise.resolve(3))
//     .then(console.log)


// Promise.resolve('1')
//     .then(res => {
//       console.log(res)
//     })
//     .finally(() => {
//       console.log('finally')
//     })

// 例子14 为什么res的值是6666？
// 因为finally的实现原理是返回了this.then(success,error),
// 如果上一步是成功，则调用finally的promise.resolve(callback()).then(()=>data) 返回上一个then的data给下一个then
// 如果上一步是失败,则调用finally的promise.reject(callback()).then(()=>{ new Error(err)})
// Promise.resolve('6666')
//     .finally(() => {
//       console.log('finally2')
//       return '我是finally2返回的值'
//     })
//     .then(res => {
//       console.log('finally2后面的then函数', res)
//     })

// * 例子15 为什么是 promise1 1 error finally1 finally2 而不是 promise1 1 error finally2？
// 因为链式调用后面的内容需要等前一个调用执行完才会执行。

// function promise1 () {
//   let p = new Promise((resolve) => {
//     console.log('promise1');
//     resolve('1')
//   })
//   return p;
// }
// function promise2 () {
//   return new Promise((resolve, reject) => {
//     reject('error')
//   })
// }
// promise1()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .finally(() => console.log('finally1'))
//
// promise2()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
//     .finally(() => console.log('finally2'))
//

// 例子16 promise all 只要捕获到错误就会走reject，其他数据就不会出来了
// function runAsync (x) {
//   const p = new Promise(resolve => {
//      setTimeout(() => {
//       resolve(x, console.log('???',x))
//     }, 1000)
//   })
//   return p
// }
// function runReject (x) {
//   const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log('!!!',x)), 1000 * x))
//   return p
// }
// MyPromise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
//     .then(res => console.log('then',res))
//     .catch(err => console.log('catch',err))

// 例子17 race 第一个完成的第一个执行，最先报错的，后面都不会出来
// function runAsync(x) {
//   const p = new Promise(r =>
//       setTimeout(() => r(x, console.log(x)), 1000)
//   );
//   return p;
// }
// function runReject(x) {
//   const p = new Promise((res, rej) =>
//       setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
//   );
//   return p;
// }
// MyPromise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
//     .then(res => console.log("result: ", res))
//     .catch(err => console.log(err));

