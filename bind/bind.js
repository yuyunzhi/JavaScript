Function.prototype.myBind =  function (context,...rest){
  if(typeof this !== 'function'){
    throw TypeError('not a function')
  }
  // context = context | window
  context.fn = this

  let newFnx = function (){
    return context.fn(...rest)
  }

  return newFnx
}

let obj = {
  a:1
}

function x(args){
  console.log(this.a);
  return args
}

let x1  = x.myBind(obj,'hahaa')
console.log(x1());
