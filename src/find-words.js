const findWord = require('./find-word');
module.exports = ({grid,words}) => {
    const findWordInGrid = findWord(grid);
    return words.map((word)=>findWordInGrid(word)).join('\n');
}