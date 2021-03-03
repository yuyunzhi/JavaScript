const arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

function flat (array,result=[]) {
    for(let i = 0;i<array.length;i++){
        if(Array.isArray(array[i])){
            flat(array[i],result)
        }else{

            result.push(array[i])
        }
    }
    return result
}

flat(arr)





