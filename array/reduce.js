Array.prototype.myReduce = function (fn,initalData){
  let resultData = initalData
  const arr = Array.prototype.slice.call(this)
  for(let i = 0; i<arr.length;i++){
    resultData = fn(resultData,arr[i],i,arr)
  }
  return resultData
}

[1,2,3,4,5].myReduce(function(pre,cur,index,arr){
  return pre + cur
},0)
