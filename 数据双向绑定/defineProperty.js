function observe(data) {
  if(!data || typeof data !== 'object') return

  for(var key in data) {
    let val = data[key]
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        track(data, key)
        return val
      },
      set: function(newVal) {
        trigger(data, key, newVal)
        val = newVal
      }
    })
    // if(typeof val === 'object'){
    //   observe(val)
    // }
  }
}

function track(data, key) {
  console.log('get data ', key)
}

function trigger(data, key, value) {
  console.log('set data', key, ":", value)
}

var data = {
  name: 'hunger',
  friends: [1, 2, 3]
}
observe(data)

// console.log(data.name)
// data.name = 'valley'
// data.friends[0] = 4
data.friends[3] = 5 // 非响应式
data.friends.push (6) //非响应式
// data.age = 6  //非响应式
console.log(data.friends);
