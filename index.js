let arr = [1,1,2,2,3,3,4,5,8,8,9,3,5]

function set (arr){
  let hash = {}
  for(let i = 0;i<arr.length ;i++){
    hash[arr[i]] = true
  }
  return Object.keys(hash).map(Number)
}

console.log(set(arr));
