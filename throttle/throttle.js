function throttle(fn, time = 1000, options = {
  leading: true,
  context: null
}) {
  let timer
  let previous = new Date(0).getTime()
  const _throttle = (...args) => {
    let now = new Date().getTime()
    if (!options.leading) {
      if (timer) return
      timer = setTimeout(() => {
        fn.apply(options.context, args)
        timer = null
      }, time)
    } else if (now - previous > time) {
      fn.apply(options.context, args)
      previous = now
    }
  }
  _throttle.cancel = () => {
    previous = 0
    clearTimeout(timer)
    timer = null
  }

  return _throttle
}


// 简化版本
function throttle(fn, time) {
  let previous = new Date().getTime()
  return (...args) => {
    let now = new Date().getTime()
    if (now - previous > time) {
      fn(args)
      previous = now
    }
  }
}




let throttleAjax = throttle(ajax, 1000)
let inputc = document.getElementById('throttle')
inputc.addEventListener('keyup', function (e) {
  throttleAjax(e.target.value)
})


