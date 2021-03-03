// 判断实例是某个类型

const myInstanceof = (leftValue, rightValue) => {
  let rightPrototype = rightValue.prototype
  leftValue = leftValue.__proto__
  while (true) {

    if (!leftValue) {
      return false
    }

    if (rightPrototype === leftValue) {
      return true
    }

    leftValue = leftValue.__proto__
  }
}


//
myInstanceof(1, Number) // true
myInstanceof([], Array) // true
