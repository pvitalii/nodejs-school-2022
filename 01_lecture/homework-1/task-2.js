const add = (a, b) => a+b;
const wrapper = (func) => {
    const cache = {}
    return (x, y) => {
        if (`${x}+${y}` in cache) {
            return `${cache[`${x}+${y}`]} from cache`
        }
        else {
            const result = func(x, y)
            cache[`${x}+${y}`] = result
            return `${result} calculated`
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