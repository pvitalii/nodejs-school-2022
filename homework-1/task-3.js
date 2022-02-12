function searchSerial(arr, value) {
    if (!arr.includes(value)) return 0
    let maxCount = 0
    let count = 1
    for (let i = 0; i <= arr.length; i++) {
        if (arr[i] === value) {
            if (arr[i] === arr[i+1]) count++
        }
        else {
            if (count > maxCount) maxCount = count
            count = 1
        }
    }
    return maxCount
}

console.log(searchSerial([1,1,1,2,1,1,1,1,2,1,1], 1))
