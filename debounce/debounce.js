
// js版本

function debounce (fn,delay){
  let timer
  return (...params)=>{
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn(...params)
    },delay)
  }
}


// 使用方式
const log = debounce(()=>console.log('hello world'),5000)

log()
log()
log()

// react 版本

function useDebounce (value,delay=300) {
  const [debounceValue,setDebounceValue]= useState(value)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebounceValue(value)
    },delay)
    return ()=>{
        clearTimeout(timer)
    }
  },[value,delay])
  return debounceValue
}
// 使用方式
const debounceValue = useDebounce(value,5000)

useEffect(()=>{
  // TODO 发送请求
},[debounceValue])


// input 防抖 debounce 简化版本

function debounce(fn,time = 300){
  let timer = null
  const _debounce = (...args) =>{

    if (timer) {
      clearTimeout(timer)
      timer = null
      return
    }

    timer = setTimeout(() => {
      fn(...args)
      clearTimeout(timer)
      timer = null
    }, time)
  }
  _debounce.cancel = ()=>{
    clearTimeout(timer)
    timer = null
  }

  return _debounce
}

















