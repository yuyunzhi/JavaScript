// 浏览器缓存淘汰策略，
// 最常见的淘汰策略有 FIFO（先进先出）、
// LFU（最少使用）、
// LRU（最近最少使用）。

// * 在keep-alive内部会维护一个数组keys 用来存放需要缓存的组件key
// * 还需要一个对象 用来存放需要缓存的组件 key：components
// * 当进行组件切换的时候会判断当前的这个组件的key是否在keys中，如果在的话就将当前的keys从数组中删除，然后push到最下面
// * 如果不在就直接push，并将当前的组件添加到对象中进行缓存
// * 然后判断是否达到最大容量，如果达到就将数组中的第一个key删除，并将对象中对应的key设置为null

// 简单来说 一个数组长度为3 [A,B,C]  只要我用了（get）某个值就把值放在数组的第三位（最新位置），只要我存了put，就把存的值放在最新位置上
// 算法实现：
class LRUCache {
  constructor(capacity) {
    this.cache = new Map()
    this.capacity = capacity
  }
  get(key){
    if(!this.cache.has(key)) return -1
    // 只要我用了（get）某个值就把值放在数组的第三位（最新位置）

    let tempCache = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key,tempCache)

    return tempCache

  }
  put(key,cache){
    // 只要我存了put，就把存的值放在最新位置上
    if(this.cache.has(key)) {
      this.cache.delete(key)
    }

    this.cache.set(key,cache)
    // 然后判断长度，去掉第一位
    if(this.cache.size > this.capacity){
      // 注意，因为this.cache.keys() 返回的值是iterator，所以只能用next()获取第一个值 {done,value}
      let key = this.cache.keys().next().value
      this.cache.delete(key)
    }

  }
}

