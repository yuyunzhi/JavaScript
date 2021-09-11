// 0、1、1、2、3、5、8、13、21、34、0、1、1、2、3、5、8、13、21、34、……
// 0，1，2，3，4，5，6，7，8……
function fib0(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib0(n - 1) + fib0(n - 2)
}


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

function fib2(n) {
  let [v1, v2] = [0, 1]
  for (let i = 2; i <= n; i++) {
    [v1, v2] = [v2, v1 + v2]
  }
  return v2
}

console.log(fib0(50));
console.log(fib1(50));
console.log(fib2(50));
