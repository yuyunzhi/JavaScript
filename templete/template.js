const render = (template, context) => {
  const getVal = (obj, props) => {
    while(props.length > 0){
      const n = props.shift()
      obj = obj[n]
    }
    return obj
  }

  return template.replace(/\{\{\s*(\w+(\.\w+)*)\s*\}\}/g, (p1, p2) => {
    console.log('p1----p2',p1,p2)
    return getVal(context, p2.split('.'))
  })
}

const template = '{{name}}很厉害，才{{age}}岁，他少年{{obj.a}}，独力支持，做了{{obj.b.c}}。'
const context = {
  name: '二月',
  age: '15',
  obj: {
    a: '出外谋生',
    b: {
      c: '许多大事'
    }
  }
}

console.log(render(template, context))
// 二月很厉害，才15岁，他少年出外谋生，独力支持，做了许多大事
