class Person {
    constructor (age) {
        this.age = age
    }

    run () {
        console.log('Person')
    }
}

class Student extends Person {
    constructor (name ,age) {
        super(age)
        this.name = name
    }

    fight () {
        console.log('fight')
    }

    run () {
        console.log('Student')
    }

}

// 使用方式

let p1 = new Student('小明', 11)
let p2 = new Student('小红', 111)
//  子类与父类的方法名不覆盖，修改子类p1的原型链，子类p2也会同步修改

p1.run() // 调用子类  Student
p1.__proto__.run() //调用父类  Person

// p1.__proto__ 的原型链
p1.__proto__ === Student.prototype
Student.prototype.__proto__ === Person.prototype
Person.prototype.__proto__ === Object.prototype

// Person、Student.__proto__ 的原型链
Student.__proto__ === Person //注意这里并不等于 Function.protoype，因为使用class构造出来的
Person.__proto__ === Function.prototype

// constructor
p1.constructor === Student
Student.constructor === Function
Person.constructor === Function

// 所以
console.log(p1 instanceof Student) //true
console.log(p1 instanceof Person) //true

