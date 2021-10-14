let obj = {
 a:1
}


Function.prototype.myBind =  function (context,...rest){
  if(typeof this !== 'function'){
    throw TypeError('not a function')
  }
  context.fn = this

  let newFnx = function (){
    return context.fn(...rest)
  }

  return newFnx
}
let a = 'window'
const b =()=>{
  console.log(this.a)
}
// const c = b.myBind(obj)
// c()

b.bind(obj)()
