function myCreate (obj) {
    function F () {}
    F.prototype = obj
    return new F()
}

Object.prototype.myCreate = myCreate

// 使用方式

const a = {
    fruit :'apple'
}

const b = Object.myCreate(a)

//则有

console.log(b); // {}
console.log(b.__proto__); // { fruit : 'apple' }


