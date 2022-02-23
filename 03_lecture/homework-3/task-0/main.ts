import fs from "fs";
import path from "path";
import url from "url";
import _process from "process";
import axios from "axios";

const pathToFile = _process.argv[2]
const newDirName = path.parse(pathToFile).name + '_pages';

fs.promises.readFile(pathToFile).then(async (data) => {
    await fs.promises.mkdir(path.join(__dirname, newDirName), {recursive: true});
    for (const link of JSON.parse(data.toString())) {
        const myUrl = new url.URL(link);
        await getHTML(myUrl, newDirName)
    }
})

async function getHTML(url: url.URL, dirName: string) {
    await fs.promises.writeFile(
        path.join(dirName, `${url.host + url.pathname.replace(new RegExp('/', 'g'), '-')}.html`),
        (await axios.get(url.href)).data,
    );
}