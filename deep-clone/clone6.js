// ->性能优化 for in 换成 while并抽象出forEach通用函数

function forEach(array, iteratee) {
    let index = 0;
    const length = array.length;
    while (index < length) {
        iteratee(array[index], index);
        index++
    }
    return array;
}

export function clone(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        const isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};

        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);

        const keys = isArray ? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value;
            }
            cloneTarget[key] = clone(target[key], map);
        });

        return cloneTarget;
    } else {
        return target;
    }
}



