// function fn(a,b){
//   console.log('fn....');
//   return a+b
// }
//
// function* gen(x){
//   console.log(x);
//   let y = yield fn(x,100) + 3
//   console.log(y);
//   return 200
// }

const delayer = (t) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      reject('delayer失败了')
    }, t)
  })
}

function run(gFun,...initValue){
  let gen = gFun(...initValue)
  function next(data){
    return new Promise((resolve,reject)=>{
      let result = gen.next(data)
      if(result.done) return
      result.value.then(res=>{
        next(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
  return next()
}

function* start(x){
  let t1 = yield delayer(1025)
  console.log('ti',t1);
  console.log('--------');
  let t2 = yield delayer(1011)
  console.log('t2',t2);
  console.log('--------');
}

run(start,1).catch(err=>{
  console.log('run error',err);
})


