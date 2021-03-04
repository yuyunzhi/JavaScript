Array.prototype.myBind = function (context,...args){

      const rawFn = this

      const newFn = function (){
        rawFn.call(context,...args)
      }

      return newFn
}


const a = b.bind('xxx',...args)
