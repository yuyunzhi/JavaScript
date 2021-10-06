
function ajax (time = 0){
  return new Promise((resolve => {
    setTimeout(()=>{
      resolve(1)
    },time)
  }))
}

// ajax().then(res=>{})
// Promise.race([ajax(100),ajax(1000),ajax(500)]).then(res=>{})
// Promise.all([ajax(100),ajax(1000),ajax(500)]).then(res=>{})
// Promise.reject(1).then(res=>{})
// Promise.reject(1).catch((res)=>{
//   console.log(res);
// })

ajax.call(obj,'xxx')

obj.ajax()
Function.prototype.myCall = function (context,...arguments){
      if(typeof context !== 'function'){
        throw new Error('不是函数')
      }

      context = context || window

      context.fn = this
      const result = context.fn(...arguments)

      return result

}
