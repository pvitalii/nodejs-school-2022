const arr = [1, 2, 3, 6, 7, 9];

function arrayMutateRemove <Type>(array: Type[], callback: (it: Type) => boolean): Type[]  {
    const removed = []
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i])) {
            removed.push(array[i])
        }
    }
    removed.forEach(e => {array.splice(array.indexOf(e), 1)})
    return removed
}

const removedElements = arrayMutateRemove(arr, (item) => item % 2 === 0);

console.log(removedElements)
console.log(arr)