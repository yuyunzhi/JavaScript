const dinner = {
  meal: 'tacos'
}

const handler = {
  get(target, prop) {
    console.log('get...', prop)
    //return target[prop]
    return Reflect.get(...arguments)
  },
  set(target, key, value) {
    console.log('set...', key, value)
    //target[key] = value
    return Reflect.set(...arguments)
  }
}

const proxy = new Proxy(dinner, handler)
console.log(proxy.meal)
