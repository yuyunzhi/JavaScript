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

console.log(p1 instanceof Student) //true
console.log(p1 instanceof Person) //true

//  子类与父类的方法名不覆盖

p1.run() // 调用子类  Student
p1.__proto__.run() //调用父类  Person
