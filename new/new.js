function myNew (fn ,...rest) {
    let obj = {}
    obj.__proto = fn.prototype
    fn.apply(obj, ...rest)
}


// 使用方式

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        alert(this.name);
    };
}

let p1 = myNew(Person,"Ysir",24,"stu");
