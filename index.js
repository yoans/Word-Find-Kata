const fs = require('fs');
const fileParser = require('./src/file-parser');
const findWords = require('./src/find-words');
fs.readFile('./data/sample-grid.txt',(_,data)=>{
    console.log({data:data.toString('utf8')});
    findWords(fileParser(data));
});