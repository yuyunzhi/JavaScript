
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

class MyPromise{

}


function myTypeof (data,type){
  return Object.prototype.toString.call(data) === `[object ${type}]`
}


function deepClone(target){
  let result

  if(typeof target !== 'object'){
    result = target
  }else{
    if(Array.isArray(target)){
      // [] 递归
      result = []
      for(let key in target){
        result.push(deepClone(target[key]))
      }
    }else if(target === null){
      result = target
    }else if(target.constructor === RegExp){
      result = target
    }else{
      // {} 递归
      result = {}
      for(let key in target){
        result[key] = deepClone(target[key])
      }
    }
  }
  return result
}

let obj = {
  a: null,
  b: undefined,
  c: function () {},
  d: [1, 2, 3],
  e: {a: [], b: 'c'}
}

console.log(deepClone(obj));
