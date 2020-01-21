// -> 画龙点睛  WeakMap 代替Map 强引用变成弱引用

export function clone(target, map = new WeakMap()) {
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
