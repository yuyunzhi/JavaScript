function curry(fn){
    if(fn.length <= 1) return fn
    const generator = (...args) =>{
        if(fn.length === args.length){
            return fn(...args)
        }else{
            return (...args2)=>{
              return generator(...args,...args2)
            }
        }
    }
    return generator
}

// 使用方式
let add = (a,b,c,d) => a+b+c+d
const curriedAdd = curry(add) //generator
curriedAdd(5)(6)(7)(8)
curriedAdd(5,6)(7)(8)
curriedAdd(5,6,7,8)




