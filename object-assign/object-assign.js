// 因为是浅拷贝，只对第一层挨个遍历拷贝，是对象那么拷贝的是引用地址，是基本类型的就是深拷贝
function myObjectAssign(target,...copyList) {

  if(typeof target !== 'object'){
    return throw new TypeError('not object')
  }

  for(let i = 0;i<copyList.length;i++){
    let objectItem = copyList[i]

    for(let key in objectItem){
          if(objectItem.hasOwnProperty(key)){
            target[key] = objectItem[key]
          }
    }

  }

  return target
}
