function myInstanceof(a,b){
  let leftValue = a.__proto__
  let rightValue = b.prototype
  while(true){
    if(leftValue === rightValue){
      return true
    }
    if(!leftValue) return false
    leftValue = leftValue.__proto__
  }
}

Array.prototype.myEach = function (fn){
   let arr  =  Array.prototype.slice.call(this)
  for(let i = 0;i<arr.length;i++){
      if(arr[i].hasOwnProperty(i))
      fn(arr[i],i,arr)
  }
}

