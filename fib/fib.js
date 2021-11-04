// 首先，斐波那契数列从第0个开始，分别是 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233……
function fib0(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib0(n - 1) + fib0(n - 2)
}

// 维护一个长数组
function fib1(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  let times = n - 2
  let result = [0, 1]
  while (times >= 0) {
    const sum = result[result.length - 1] + result[result.length - 2]
    result.push(sum)
    times--
  }
  return result[result.length - 1]
}

// 动态规划版本
function fib2(n){
  if(n === 0) return 0
  if(n === 1) return 1
  let a = 0
  let b = 1
  while(n>1){
    [a,b] = [b,a+b]
    n--
  }

  return b
}

// 带缓存
let cache = []

function fib3(n){

  if(cache[n]) return cache[n]

  if (n === 0) {
      cache[n] = 0
    return 0
  }
  if (n === 1){
    cache[n] = 1
    return 1
  }
  cache[n] = fib3(n - 1) + fib3(n - 2)
  return cache[n]
}

console.log('fib0',fib0(11));
console.log('fib1',fib1(11));
console.log('fib2',fib2(11));
console.log('fib3',fib3(11));

// 大数

function fibx(n){
  let [v1,v2] = [0n,1n]
  for(let i= 2;i<=n;i++){
    [v1,v2] = [v2,v1+v2]
  }
  return v2
}
