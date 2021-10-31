
Array.prototype.myEvery = function (fn,context){
  const arr = Array.prototype.slice.call(this)
  for(let i = 0;i<arr.length;i++){
    if(!fn.call(context,arr[i],i,arr)){
      return false
    }
  }
  return true
}


let result = [2, 3, 0, 1, 4].myEvery((element, index, array)=>{
  return element >= 5; //数组中是否有一个元素大于 10
})

