
// ->.原生数据类型直接返回，引用类型递归

export function clone2(target) {
    if (typeof target === 'object') {
        let cloneTarget = {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
}


// -> 考虑value存在数组

export function clone3(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
}

// -> 考虑引用循环存在数组 target.target = target

export function clone4(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        map.set(target, cloneTarget);
        return cloneTarget;
    } else {
        return target;
    }
}

// -> 画龙点睛  WeakMap 代替Map 强引用变成弱引用

export function clone5(target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        map.set(target, cloneTarget);
        return cloneTarget;
    } else {
        return target;
    }
}

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

export function clone6(target, map = new WeakMap()) {
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



