import request from "request"
import fs from "fs";
import path from "path";
import url from "url";
import _process from "process";

const pathToFile = _process.argv[2]

let readableStream = fs.createReadStream(pathToFile, "utf8");
readableStream.on("data", function(chunk: string){
    const newDirName = path.parse(pathToFile).name + '_pages'
    createFolder(newDirName)
    JSON.parse(chunk).forEach(link => {
        const myUrl = new url.URL(link);
        getHTML(myUrl, newDirName)
    });
});

function createFolder(name: string) {
    fs.mkdir(path.join(__dirname, name), {}, err => {
        if (err) throw err;
        console.log('Folder created...');
    });
}

function getHTML(url: url.URL, dirName: string) {
    request(url.href, function (error, response, body) {
            let writeableStream = fs.createWriteStream(
                `${dirName}/${url.host + url.pathname.replace(new RegExp('/', 'g'),'-')}.html`,
                {encoding: 'utf-8'}
            );
            writeableStream.write(body);
        }
    )
}