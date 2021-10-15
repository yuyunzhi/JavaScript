
// 使用for循环实现map
Array.prototype.myMap = function (fn, context) {
  const arr = Array.prototype.slice.call(this)
  const newArray = []
  for (let i = 0; i < arr.length; i++) {
    if(!arr.hasOwnProperty(i)) continue
    newArray.push(fn.call(context, arr[i], i, arr))
  }
  return newArray
}

// 使用reduce实现map
Array.prototype.myMap2 = function (fn,context){
  const arr = Array.prototype.slice.call(this)
  let newArray = []
  arr.reduce((pre,cur,index)=>{
    newArray.push(fn(cur,index,arr))
  },0)
  return newArray
}


let a = [1, 2, 3, 4,5]
let b = a.myMap2((item, index, array) => {
  return item + 1
})
console.log(b);
