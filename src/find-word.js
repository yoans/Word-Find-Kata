const {range} = require('ramda');
const getStartingCoordinateInfo = (grid, word) => {
    let startXIndex;
    let startYIndex;
    let reversed;
    const foundWord = grid.find((row, yIndex)=>{
        let xIndex = row.indexOf(word)
        startYIndex = yIndex;

        if(xIndex>=0){
            startXIndex = xIndex;
            return true 
        }
        const reversedWord = word.split('').reverse().join();
        xIndex = row.indexOf(reversedWord);

        if(xIndex>=0){
            startXIndex = xIndex;
            reversed = true;
            return true 
        }
    })
    return {startXIndex, startYIndex, reversed, foundWord}
}
const searchHorizontally = (grid, word) => {
    const {startXIndex, startYIndex, reversed, foundWord} = getStartingCoordinateInfo(grid, word);

    if(foundWord){
        const coordinates = range(0, word.length).map((index)=>`(${startXIndex+index},${startYIndex})`);
        const orderedCoordinates = reversed ? coordinates.reverse() : coordinates;
        return `${word}: ${orderedCoordinates}`
    };
}



module.exports = (grid) => (word) => {
    return searchHorizontally(grid, word);
}