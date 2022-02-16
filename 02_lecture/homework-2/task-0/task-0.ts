function anagramCheck (str1: string, str2: string) {
    function toLetters(str: string) {
        const letters: string[] = [];
        for (let i = 0; i < str.length; i++) {
            if (str[i].toLowerCase() !== str[i].toUpperCase()) letters.push(str[i].toLowerCase())
        }
        return letters.sort().join('')
    }
    return toLetters(str1) === toLetters(str2)
}

console.log(anagramCheck("Lorin Morgan-Richards", "Marcil d'Hirson Garron"))
