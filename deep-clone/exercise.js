// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if(target===null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if(target.constructor===RegExp){
      result = target;
    }else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}

let obj = {
  a: null,
  b: undefined,
  c: function () {
  },
  d: [1, 2, 3],
  e: {a: [], b: 'c'}
}

console.log(deepClone(obj))
// 利用JSON的方法实现简单的深拷贝

//
// 但是它有局限性
//
// 不可以拷贝 undefined ， function， RegExp 等等类型的
//
// 会抛弃对象的 constructor，所有的构造函数会指向 Object
//
// 对象有循环引用，会报错
