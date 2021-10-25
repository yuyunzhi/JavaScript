function fn(a,b){
  console.log('fn....');
  return a+b
}

function* gen(x){
  console.log(x);
  let y = yield fn(x,100) + 3
  console.log('y',y);
  return 200
}

let g = gen(6)


let l = g.next()
console.log('l',l);
g.next(l.value)
