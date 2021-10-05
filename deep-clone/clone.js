// 递归判断是否对象和数组
function deepClone(obj, target) {
  if(!obj) return
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      if(Array.isArray(key) || (typeof obj[key] === 'object' && obj[key] !== null)) {
        target[key] = []

        deepClone(obj[key], target[key])
      } else {
        target[key] = obj[key]
      }
    }
  }
  return target
}
