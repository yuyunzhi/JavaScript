/* my-vuex/index.js */

// 保存一个全局的 Vue 之后会用到
let _Vue = null

// Store 类
class Store {
  // 先完成构造方法,构造方法接收一个对象
  constructor(options) {
    // 赋初值
    const state = options.state || {}
    const mutations = options.mutations || {}
    const actions = options.actions || {}
    const getters = options.getters || {}

    // 1.实现state 把 state 中的数据转为 响应式,直接用 Vue 中的 observable
    this.state = _Vue.observable(state)

    // 2.实现 getters
    // 好处是不用考虑会和原型链上的属性重名问题
    this.getters = Object.create(null)
    // 我们要为 getters 添加一个 get 方法，这里就要使用 数据劫持
    // 先拿到 getters 中每一个 方法
    Object.keys(getters).forEach((key) => {
      // 第一个参数是给谁添加 ，第二个是添加的属性名，第三个对象里面可以设置很多参数
      // 比如 可枚举，可配置，get，set
      // 使用方式 this.$store.getters.xxx
      Object.defineProperty(this.getters, key, {
        // 为 this.getters 每一项都添加 一个 get 方法
        get: () => {
          // 还记得吧，getters 中的方法 默认把 state传入进去,改变this指向
          return getters[key].call(this, this.state)
        },
      })
    })

    // 3.实现 mutations
    // 先遍历 mutaions 中的对象进行改变 this指向
    this.mutations = {}  // key function , key ,function
    // 使用方式 this.$store.commit('xxx','data')
    Object.keys(mutations).forEach((key) => {
      this.mutations[key] = (params) => {
        // 改变this指向 ，默认是要传入 state
        mutations[key].call(this, this.state, params)
      }
    })

    // 4.实现 actions
    // 和 mutations 一样我们需要重新改变 this 指向
    this.actions = {}
    Object.keys(actions).forEach((key) => {
      this.actions[key] = (params) => {
        // 改变this指向 ，默认是要传入 store也就是 this
        actions[key].call(this, this, params)
      }
    })
  }

  // 5.实现commit 方法
  // 用于 触发mutations中的方法
  // 第一个参数是事件名 ，第二个是参数
  commit = (eventName, params) => {
    this.mutations[eventName](params)
  }

  // 6.实现 dispatch 方法
  // 用于 触发actions中的异步方法
  // 第一个参数是事件名 ，第二个是参数
  dispatch = (eventName, params) => {
    this.actions[eventName](params)
  }
}

// 因为Vuex 需要 Vue.use() 安装，所以我们必须要有个 install 方法 传入 Vue
// 第二个参数是一个可选对象
const install = function(Vue) {
  // 保存到全局 _Vue
  _Vue = Vue
  // 全局注册混入 这样在所有的组件都能使用 $store
  _Vue.mixin({
    // beforeCreate vue初始化阶段
    // 在 beforeCreate 这个时候把 $store 挂载到 Vue 上
    beforeCreate() {
      // 判断 Vue 传递的对象是否有 store 需要挂载
      // this.$options  是new Vue() 传递的对象
      console.log('vue store install',this.$options.store);
      if (this.$options.store) {
        // 把 store 挂载到 Vue 原型上
        _Vue.prototype.$store = this.$options.store
      }
    },
  })
}

// mapState
const mapState = (params) => {
  // 这里我只写个数组的 起别名的就没弄哈
  if (!Array.isArray(params))
    throw new Error('抱歉，当前是丐版的Vuex，只支持数组参数')
  // 第一步就是要初始 obj ,不然[item] 会报错
  let obj = {}
  // 实现逻辑很简单，就是接收传递的的参数
  // 去this.$store寻找
  params.forEach((item) => {
    obj[item] = function() {
      return this.$store.state[item]
    }
  })
  return obj
}

// mapMutations
const mapMutations = (params) => {
  // 这里我只写个数组的 起别名的就没弄哈
  if (!Array.isArray(params))
    throw new Error('抱歉，当前是丐版的Vuex，只支持数组参数')
  // 第一步就是要初始 obj ,不然[item] 会报错
  let obj = {}
  // 实现逻辑很简单，就是接收传递的的参数
  // 去this.$store寻找
  params.forEach((item) => {
    obj[item] = function(params) {
      return this.$store.commit(item, params)
    }
  })
  return obj
}

// mapActions
const mapActions = (params) => {
  // 这里我只写个数组的 起别名的就没弄哈
  if (!Array.isArray(params))
    throw new Error('抱歉，当前是丐版的Vuex，只支持数组参数')
  // 第一步就是要初始 obj ,不然[item] 会报错
  let obj = {}
  // 实现逻辑很简单，就是接收传递的的参数
  // 去this.$store寻找
  params.forEach((item) => {
    obj[item] = function(params) {
      return this.$store.dispatch(item, params)
    }
  })
  return obj
}

// mapGetters
const mapGetters = (params) => {
  // 这里我只写个数组的 起别名的就没弄哈
  if (!Array.isArray(params))
    throw new Error('抱歉，当前是丐版的Vuex，只支持数组参数')
  // 第一步就是要初始 obj ,不然[item] 会报错
  let obj = {}
  // 实现逻辑很简单，就是接收传递的的参数
  // 去this.$store寻找
  params.forEach((item) => {
    obj[item] = function() {
      return this.$store.getters[item]
    }
  })
  return obj
}
// 导出
export { mapState, mapMutations, mapActions, mapGetters }

// 导出 install 和 store
export default {
  install,
  Store,
}

