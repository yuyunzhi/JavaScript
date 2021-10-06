function ajax(time = 0) {
  return new Promise((resolve => {
    setTimeout(() => {
      resolve(1)
    }, time)
  }))
}

// ajax().then(res=>{})
// Promise.race([ajax(100),ajax(1000),ajax(500)]).then(res=>{})
// Promise.all([ajax(100),ajax(1000),ajax(500)]).then(res=>{})
// Promise.reject(1).then(res=>{})
// Promise.reject(1).catch((res)=>{
//   console.log(res);
// })



function throttle (fn){
  let time = 1000
  let preTimeStamp = new Date().getTime()

  const _throttle = (...args) => {
    let curTimeStamp = new Date().getTime()
    if(curTimeStamp - preTimeStamp > time){
      // 执行代码
      fn(...args)
      preTimeStamp = curTimeStamp
    }
  }

  return _throttle
}




