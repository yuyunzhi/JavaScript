// 使用方式

const delayer = (t) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}

async function start() {
  console.log(1);
  await delayer(1000)
  console.log(2);
  await delayer(1000)
  console.log(3);

}

start()


// async await 是语法糖
