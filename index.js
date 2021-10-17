class EventBus {

  constructor() {
    this.events = {}
  }

  emit(eventName,data){
    if(!this.events[eventName])return

    this.events[eventName].forEach(cb=>{
      cb(data)
    })

  }

  on(eventName,fn){
    if(this.events[eventName]){
      this.events[eventName].push(fn)
    }else{
      this.events[eventName] = [fn]
    }
  }

  off(eventName,callback) {
    if (!this.events[eventName]) return
    this.events[eventName] = this.events[eventName].filter(fn=>{
      return callback !== fn
    })
  }

  once(eventName,fn){
    const one = ()=>{
      fn()
      this.off(eventName,one)
    }
    this.on(eventName,one)
  }

}

const eventBus = new EventBus()

eventBus.on('xxx',(res)=>{
  console.log(1,res)
})

const handle = (res)=>{
  console.log(2,res)
}
eventBus.on('xxx',handle)

eventBus.off('xxx',handle)

eventBus.emit('xxx','data1')

eventBus.once("dbClick", () => {
  console.log(123456);
})

eventBus.emit("dbClick");

eventBus.emit("dbClick");
