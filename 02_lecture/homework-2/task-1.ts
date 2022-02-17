const array: Array<string> = ["one", "two", "three"];

async function runSequentially <Type, R>(arr: Type[], callback: (itm: Type, ind: number) => Promise<R>): Promise<R[]> {
    const res = []
    for (let i = 0; i < arr.length; i++) {
        res.push(await callback(arr[i], i))
    }
    return res
}

async function main() {
    const result = await runSequentially(array, (item, index) =>
        Promise.resolve({
            item,
            index
        })
    )
    return result
}

main().then(value => console.log(value))
