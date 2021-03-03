window.eventHub = {
    events:{},// 'xxx':[fn1,fn2,fn3],'yyy':[fn4,fn5,fn6]
    emit:(event,data)=>{
      this.events[event].forEach(fn=>{
        fn(data)
      })
    },
    on:(event,fn)=>{
        this.events[event] ? this.events[event].push(fn) : this.events[event] = []
    }
}

window.eventHub.emit('xxx',{a:'1'})

window.eventHub.on('xxx',(data)=>{
  console.log(data) // {a:'1'}
})
