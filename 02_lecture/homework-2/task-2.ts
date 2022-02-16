const arr = [1, 2, 3, 6, 7, 9];

function arrayMutateRemove <Type>(array: Type[], callback: (i: Type) => void) {
    const removed = array.filter(callback)
    removed.forEach(e => {array.splice(array.indexOf(e), 1)})
    return removed
}

const removedElements = arrayMutateRemove(arr, (item) => item % 2 === 0);

console.log(removedElements)
console.log(arr)