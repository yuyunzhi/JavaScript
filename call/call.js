function myCall(context,...args) {
    // 1
    if (typeof this !== 'function'){
        throw new TypeError('error')
    }
    // 2
    context = context || window
    // 3
    context.fn = this
    // 4
    const result = context.fn(...args)
    // 5
    delete context.fn

    return result
}

Function.prototype.myCall = myCall

// getName.myCall(obj， 'str1', 'str2')




