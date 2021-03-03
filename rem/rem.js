
function rem (zoom = 75){
  const doc = document.documentElement
  const width = doc.getBoundingClientRect().width
  const rem = width / zoom
  doc.style.fontSize = rem + 'px'
}

addEventListener("resize", setRem())

