Array.prototype.myFilter = function (fn,context) {
  const arr = Array.prototype.slice.call(this)
  let filterArray = []
  for(let i = 0;i<arr.length;i++){
      fn.call(context,arr[i],i,arr) && filterArray.push(arr[i])
  }
}

// 使用reduce 实现 filter
Array.prototype.myFilter2 = function (fn,context){
  const arr = Array.prototype.slice.call(this)
  let filterArray = arr.reduce((pre,item,index)=>{
     return fn.call(context,item,index,arr) ? [...pre,item] : [...pre]
  },[])

  return filterArray

}


[1,2,3,4,5,6].myFilter((item,index,arr)=>{
  return  item > 2
})
