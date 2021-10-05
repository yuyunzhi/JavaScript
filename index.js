class EventBus {
  constructor() {
    this.events = {}
  }
  on (eventName,fn){
    if(this.events[eventName]){
      this.events[eventName].push(fn)
    }else{
      this.events[eventName] = [fn]
    }
  }
  emit(eventName,data){
    let fnArr = this.events[eventName]
    if(fnArr){
      fnArr.forEach(fn=>{
        fn.call(null,data)
      })
    }
  }
}
const eventBus = new EventBus()
eventBus.on('xxx',(data)=>{
  console.log('xxx1',data);
})
eventBus.on('xxx',(data)=>{
  console.log('xxx2',data);
})


eventBus.emit('xxx',111)


