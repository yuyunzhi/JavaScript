// 判断变量是某个类型

const myTypeOf = (target,type) =>{
  return Object.prototype.toString.call(target) === `[object ${type}]`
}

// 使用方式
myTypeOf([],'Array') // true
myTypeOf(1,'Number') // true

