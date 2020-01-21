const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
}

export function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
}
