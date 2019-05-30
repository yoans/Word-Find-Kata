const findWord = require('./find-word');
module.exports = (grid,words) => {
    const findWordInGrid = findWord(grid);
    words.map((word)=>findWordInGrid(word))
}