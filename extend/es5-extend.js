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

// 此时有
s1.__proto__.constructor === Student
s1.__proto__.__proto__.constructor === Person

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
