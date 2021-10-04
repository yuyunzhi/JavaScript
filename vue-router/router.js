let app = document.querySelector('#app')


const div1 = document.createElement('div')
div1.innerHTML = '1'

const div2 = document.createElement('div')
div2.innerHTML = '2'

const div3 = document.createElement('div')
div3.innerHTML = '3'

const div4 = document.createElement('div')
div4.innerHTML = '4'

const routeTable = {
  '1':div1,
  '2':div2,
  '3':div3,
  '4':div4
}

function  route (container){
  let number = window.location.hash.substr(1) || 1

  //获取界面
  let div = routeTable[number.toString()]
  if(!div){div = document.querySelector(`#div404`)}
  div.style.display = 'block'

  // 展示界面
  container.innerHTML = ''
  container.appendChild(div)
}

route(app)

window.addEventListener('hashchange',(e)=>{
  console.log(e);
  route(app)
})
