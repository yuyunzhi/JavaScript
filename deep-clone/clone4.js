// -> 考虑引用循环存在数组 target.target = target

export function clone(target, map = new Map()) {
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
