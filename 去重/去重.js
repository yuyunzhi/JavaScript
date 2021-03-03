// ES6
var arr = [5,5,5,5,1,2,2,3,4] // 需要去重的数组

let set = new Set(arr) // {1,2,3,4}
let newArr = Array.from(set) // [1,2,3,4]


//计数去重

var arr = [5,5,5,5,1,2,2,3,4]
let hash = {}
for(let i = 0;i<arr.length;i++){
    hash[arr[i]] = true
}

Object.keys(hash) // ["1", "2", "3", "4", "5"]
