Array.prototype.myBind =  function (context,...rest){
  if(typeof this !== 'function'){
    throw TypeError('not a function')
  }
  context = context | window
  context.fn = this

  let newFnx = function (){
    context.fn(...rest)
  }
  return newFnx
}

const a = b.bind('xxx',...args)

