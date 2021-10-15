function deepClone(target, map = new Map()) {

  if (typeof target === 'object') {

    let isArray = Array.isArray(target)
    let cloneTarget = isArray ? [] : {}

    if (map.get(target)) {
      return map.get(target)
    }

    map.set(target, cloneTarget)
    console.log('target', target);
    if (isArray) {
      // []
      for (let i in target) {
        // 递归克隆数组中的每一项
        cloneTarget.push(deepClone(target[i], map))
      }
    } else if (target === null) {
      cloneTarget = null
    } else if (target.constructor === RegExp) {
      cloneTarget = target
    } else {
      // []
      for (let key in target) {
        cloneTarget[key] = deepClone(target[key], map)
      }
    }
    return cloneTarget
  } else {
    return target
  }
}


let obj = {
  a: null,
  b: undefined,
  c: function () {
  },
  d: [1, 2, 3],
  e: {a: [], b: 'c'},
}
obj.f = obj

let dep = deepClone(obj)
console.log('-----', dep)

