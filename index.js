const delayer = (t)=>{
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(Math.random()>0.99) {
          resolve(t)
        }else{
          reject('delayer 失败了')
        }
      },t)
  })
}

function* start(r){
  console.log(1);
  const t1 = yield delayer(1000)
  console.log(2,t1);
  const t2 = yield delayer(1000)
  console.log(3,t2);
}

function run (gFen,...initValue){
  const gen = gFen(...initValue)
  function next(data){
    return new Promise((resolve,reject)=>{
      const result = gen.next(data)
      if(result.done) return
      result.value.then(res=>{
        next(res)
      }).catch(err=>{
        console.log('next error',err);
        reject(err)
      })
    })

  }
  return next()
}

run(start,'r').catch(err=>{
  console.log('run err',err);
})

