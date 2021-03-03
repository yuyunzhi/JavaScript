Array.prototype.myMap = function (fn, context) {
  console.log('this',this)
  const arr = Array.prototype.slice.call(this)
  console.log('arr',arr)
  const newArray = []
  for (let i = 0; i < arr.length; i++) {
    if(!arr.hasOwnProperty(i)) continue
    newArray.push(fn.call(context, arr[i], i, arr))
  }

  return newArray
}


    [1, 2, 3, 4, 5].myMap((item, index, array) => {
  return item + 1
})
