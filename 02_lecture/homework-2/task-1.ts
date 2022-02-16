const array: Array<string> = ["one", "two", "three"];

function runSequentially <Type>(arr: Type[], callback: (itm: Type, ind: number) => Promise<{item: Type, index: number}>) {
    return Promise.all(arr.map(callback))
}

async function main() {
    const result = await runSequentially(array, (item, index) => {
        return Promise.resolve({item, index})
    })
    return result
}

main().then(v => console.log(v))