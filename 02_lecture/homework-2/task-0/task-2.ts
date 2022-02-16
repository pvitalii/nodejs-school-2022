const add = (a, b) => a + b
const wrapper = (func: Function) => {
    const cache = {}
    return (...args): string => {
        const key = JSON.stringify(args)
        if (key in cache) {
            return cache[key]
        }
        else {
            const result = JSON.stringify(func(...args))
            cache[key] = result
            return result
        }
    }
};

const cachedAdd = wrapper(add);

console.log(cachedAdd(2,2)); // 4 calculated
console.log(cachedAdd(5,8)); // 13 calculated
console.log(cachedAdd(2,2)); // 4 from cache
console.log(cachedAdd(2,3));
console.log(cachedAdd(2,3));
console.log(cachedAdd(1,3));