
function Fn (){
  this.num = 1
  this.add = function (){
    this.num++
  }
}

const fn = new Fn()
setTimeout(fn.add,1000)

setTimeout(()=>{
  console.log('??',fn.num)
},2000)
