class Dep {
  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update())
  }
}

// 被观察者
class Watcher {
  constructor(vm, expOrFn) {
    this.vm = vm;
    this.getter = expOrFn;
    this.value;
  }

  get() {
    Dep.target = this;

    var vm = this.vm;
    var value = this.getter.call(vm, vm);
    return value;
  }

  evaluate() {
    this.value = this.get();
  }

  addDep(dep) {
    dep.addSub(this);
  }

  update() {
    console.log('更新, value:', this.value)
  }
}

// 观察者实例
var dep = new Dep();

//  被观察者实例
var watcher = new Watcher({x: 1}, (val) => val);
watcher.evaluate();

// 观察者监听被观察对象
dep.depend()

dep.notify()

