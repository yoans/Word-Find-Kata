const fs = require('fs');
const fileParser = require('./src/file-parser');
const findWords = require('./src/find-words');
fs.readFile('./data/sample-grid.txt',(_,data)=>{
    console.log(findWords(fileParser(data)));
});
if(!fs.fake){
  const Mocha = require('mocha')

  const runner = new Mocha({})

  runner.addFile('./test/file-parser.spec.js')
  runner.addFile('./test/find-word.spec.js')
  runner.addFile('./test/find-words.spec.js')
  runner.addFile('./test/file-parser.spec.js')
  runner.addFile('./test/index.spec.js')

  runner.run(failures => {
    if (failures) {
      console.error(failures)
    } else {
      console.log('All passed.')
    }
  })
}
