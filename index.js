class VueRouter{
  constructor(options) {
     this.options = options

    this.mode = options.mode || 'hash'

    switch (this.mode){
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'history':
        this.history = new HTML5History(this,options.base)
        break
    }

  }

  init(app){

  }

}


VueRouter.install = (Vue)=>{

}

export default VueRouter
