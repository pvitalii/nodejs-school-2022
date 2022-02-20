import request from "request"
import fs from "fs";
import path from "path";
import url from "url";
import _process from "process";

const pathToFile = _process.argv[2]
const newDirName = path.parse(pathToFile).name + '_pages'

fs.mkdir(path.join(__dirname, newDirName), {}, err => {
    if (err) throw err;
    console.log('Folder created...');
});

function getHTML(url) {
    request(url.href, function (error, response, body) {
            let writeableStream = fs.createWriteStream(
                `${newDirName}/${url.host + url.pathname.replaceAll('/','-')}.html`,
                {encoding: 'utf-8'}
            );
            writeableStream.write(body);
        }
    )
}

let readableStream = fs.createReadStream(pathToFile, "utf8");
readableStream.on("data", function(chunk: string){
    JSON.parse(chunk).forEach(link => {
        const myUrl = new url.URL(link);
        getHTML(myUrl)
    });
});
