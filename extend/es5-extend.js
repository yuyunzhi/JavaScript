function Person (name) {
    this.name = name
    this.age = function () {}
}

Person.prototype.run = function () {}

function Student (name,number) {
    Person.call(this,name)
    this.number = number
}
//继承原型链 相当于 Student.prototype.__proto__ = Person.prototype
// 而Person.prototype.constructor === Person
Student.prototype = Object.create(Person.prototype)
// 修复构造函数的指向
Student.prototype.constructor = Student

// 优势，可传参，函数可复用，不需要调用两次父类构造函数
// 使用方式

let s1 = new Student ('小明', 11)
let s2 = new Student ('小红', 12)

// 此时有 s1.__proto__的原型链

s1.__proto__ === Student.prototype
Student.prototype.__proto__ === Person.prototype //这一步是 Object.create(Person.prototype) 改变的
Person.prototype.__proto__ === Object.prototype

// Student.__proto__的原型链
Student.__proto__ === Function.prototype // 在es6 class里继承，子类可以找到父类
Function.prototype.__proto__ === Object.prototype

// Person.__proto__的原型链
Person.__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype

// s1的constructor
s1.constructor === Student
s1.__proto__.constructor === Student
s1.__proto__.__proto__.constructor === Person

// Student
s1.constructor === Student
Student.constructor === Function
Person.constructor === Function

// 所以

s1 instanceof Student //true
s1 instanceof Person // true

// 当修改了s1的原型链，s2也是会受影响的
s1.__proto__.hahaha=function(){console.log('hahaha')}

s1.hahaha() // hahaha
s2.hahaha() // hahaha

// 当父类Person 修改了 原型链,子类也会继承
Person.prototype.jumper = function () {console.log('jumper')}
s1.jumper() // jumper
s2.jumper() // jumper
