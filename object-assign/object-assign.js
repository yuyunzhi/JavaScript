
function myObjectAssign(target) {

  if(typeof target !== 'object'){
    return throw new TypeError('not object')
  }
  const copyList = Array.prototype.slice.call(arguments,1)

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
