// setTimeout模拟setInterval
const mySetInterval = (callback,time)=>{

  let clear = false
  let timer = null

  function interval (){
    if(clear){
      clearTimeout(time)
      time = null
      return
    }
    callback()
    timer = setTimeout(()=>{
      interval()
    },time)
  }

  interval()

  return ()=>{
    clear = true
  }
}

const cancel = mySetInterval(()=>{
  console.log(1)
},1000)

setTimeout(()=>{
  console.log('cancel');
  cancel()
},4000)




