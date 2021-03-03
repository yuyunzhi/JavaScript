
Array.prototype.mySome = function (fn,context){
  const arr = Array.prototype.slice.call(this)
  let result = false
    for(let i = 0;i<arr.length;i++){
        if(fn.call(context,arr[i],i,arr)){
        result = true
        }
    }
    return result
}


let result = [2, 3, 0, 1, 4].mySome(function isBigEnough(element, index, array) {
  return (element >= 5); //数组中是否有一个元素大于 10
})
