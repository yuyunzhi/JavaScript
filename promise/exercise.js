// 1、使用Promise实现每隔1秒输出1,2,3
function ajax(number) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(number);
      resolve(number);

    }, 1000)
  })
}

// 方案 1
// Promise.resolve().then(()=>{
//   return ajax(1)
// }).then(res => {
//   return ajax(2)
// }).then(res => {
//   return ajax(3)
// })

// 方案2  由1 转变而来
// let promiseList = [1,2,3]
// let promise = Promise.resolve()
//
// promiseList.forEach(number=>{
//   promise = promise.then(()=>{
//     return ajax(number)
//   })
// })


// 方案 3  由1 转变而来
// let promiseList = [1,2,3]
// promiseList.reduce((p,number,index)=>{
//    return p.then(()=>{
//      return ajax(number)
//    })
// },Promise.resolve())




// 2、使用Promise实现红绿灯交替重复亮
// 红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？（用Promise实现）三个亮灯函数已经存在：

// function red() {
//     console.log('red');
// }
// function green() {
//     console.log('green');
// }
// function yellow() {
//     console.log('yellow');
// }

// 3秒-红-2秒-黄-1秒-绿-3秒-红-2秒-黄-1秒-绿-……
//
// function lighten(fn,timer = 3000){
//   return new Promise(resolve => {
//     setTimeout(()=>{
//       fn()
//       resolve()
//     },timer)
//   })
// }
//
// function setUp(){
//   Promise.resolve().then(()=>{
//     return lighten(red,3000)
//   }).then(()=>{
//     return lighten(yellow,2000)
//   }).then(()=>{
//     return lighten(green,1000)
//   }).then(()=>{
//     setUp()
//   })
// }
//
// setUp()

// 3、实现mergePromise函数，
// 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。

// const time = (timer) => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve()
//     }, timer)
//   })
// }
// const ajax1 = () => time(2000).then(() => {
//   console.log(1);
//   return 1
// })
// const ajax2 = () => time(1000).then(() => {
//   console.log(2);
//   return 2
// })
// const ajax3 = () => time(1000).then(() => {
//   console.log(3);
//   return 3
// })
//
// function mergePromise (ajaxArray) {
//   // 在这里写代码
//   let data= []
//   let promise = Promise.resolve()
//   ajaxArray.forEach(ajax=>{
//     promise = promise.then(()=>{
//         return ajax()
//     }).then(res=>{
//       data.push(res)
//       return data
//     })
//   })
//   return promise
// }
//
// mergePromise([ajax1, ajax2, ajax3]).then(data => {
//   console.log("done");
//   console.log(data); // data 为 [1, 2, 3]
// });

// 4、 封装一个异步加载图片的方法

function loadImage (url){
  return new Promise ((resolve, reject) => {
      const img = new Image()
      img.onload = function (){
        console.log('图片加载好了');
          resolve(url)
      }
      img.onerror=function (){
        reject(new Error('Could not load image at' + url));
      }
      img.src = url
  })
}
//
// loadImage().then(res=>{
//
// })

// 5、限制异步操作的并发个数并尽可能快的完成全部
// 有8个图片资源的url，已经存储在数组urls中。
// urls类似于['https://image1.png', 'https://image2.png', ....]
// 而且已经有一个函数function loadImg，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。
// 但有一个要求，任何时刻同时下载的链接数量不可以超过3个。
// 请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。

var urls = [
  "https://painting1.png",
  "https://painting2.png",
  "https://painting3.png",
  "https://painting4.png",
  "https://painting5.png",
  "https://bpmn6.png",
  "https://bpmn7.png",
  "https://bpmn8.png",
];



function downloadImageInNumber(urls){
  let length = urls.length
  let initUrls = [urls.shift(),urls.shift(),urls.shift()]
  let count = 0

  return new Promise((resolve, reject) => {
    const downLoadContainer = (url)=>{
      loadImage(url).then(res=>{
        count++
        if(count === length){
          resolve()
        }else{
          urls.length > 0 && downLoadContainer(urls.shift())
        }
      },err=>{
        reject(err)
      })
    }
    for(let i = 0 ;i<initUrls.length;i++){
      downLoadContainer(initUrls[i])
    }
  })
}

downloadImageInNumber(urls).then(res=>{
  console.log('ok');
})

