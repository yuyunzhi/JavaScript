function deepClone(target, map = new Map()) {
  if (typeof target === 'object') {

    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    console.log('target',target);
    if (isArray) {
      // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        cloneTarget.push(deepClone(target[i],map))
      }

      // 判断如果当前的值是null的话；直接赋值为null
    } else if(target===null) {
      cloneTarget = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if(target.constructor===RegExp){
      cloneTarget = target;
    }else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      for (let i in target) {
        cloneTarget[i] = deepClone(target[i], map);
      }
    }

    return cloneTarget
  } else {
    return target;
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
console.log('-----',dep)

// 利用JSON的方法实现简单的深拷贝

//
// 但是它有局限性
//
// 不可以拷贝 undefined ， function， RegExp 等等类型的
//
// 会抛弃对象的 constructor，所有的构造函数会指向 Object
//
// 对象有循环引用，会报错
