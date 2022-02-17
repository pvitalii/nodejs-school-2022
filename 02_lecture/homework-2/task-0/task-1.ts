function cloneDeeply <Type>(obj: Type): Type {
    if (typeof obj !== 'object') {
        return obj
    }
    else {
        const clone: any = Array.isArray(obj) ? [] : {};
        for (const key in obj) {
            const cloneKey: string = key
            clone[cloneKey] = cloneDeeply(obj[key])
        }
        return clone
    }
}

const test: {} = {
    a: [5, {c: 'qazwsx', d: 44}, 'qwerty', [1,2,3]],
    b: { g: 8, y: 9, t: { q: 48 } },
    x: 47,
    l: { f: 85, p: { u: 89, m: 7 }, s: 71 },
    r: { a: { b: 56}}
};

const test2 = cloneDeeply(test);

test2['x']= 12;
test['b'] = 15;

console.log(test2, test);
