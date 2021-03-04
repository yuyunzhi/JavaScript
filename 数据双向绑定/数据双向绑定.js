
const obj = {}

const input = document.getElementById('input')
const span = document.getElementById('span')

Object.defineProperty(obj,'text',{
  enumerable:true,
  configurable:true,
  get(){
    console.log('获取数据')
  },
  set(newValue){
    input.value = newValue
    span.value = newValue
  }
})

input.addEventListener('input', event => {
   object.text = event.target.value
});
