const fs = require('fs');
const fileParser = require('./src/file-parser');
fs.readFile('./data/sample-grid.txt',(_,data)=>{
    fileParser(data);
});