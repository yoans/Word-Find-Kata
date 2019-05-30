const fs = require('fs');
const fileParser = require('./src/file-parser');
const findWords = require('./src/find-words');
fs.readFile('./data/sample-grid.txt',(_,data)=>{
    findWords(fileParser(data));
});