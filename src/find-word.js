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
const conditionallyReverse = (reversed, coordinates) => reversed ? coordinates.reverse() : coordinates;
const convertToString = (word, orderedCoordinates) => `${word}: ${orderedCoordinates}`;
const searchHorizontally = (grid, word) => {
    const {startXIndex, startYIndex, reversed, foundWord} = getStartingCoordinateInfo(grid, word);

    if(foundWord){
        const coordinates = range(0, word.length).map((index)=>`(${startXIndex+index},${startYIndex})`);
        const orderedCoordinates = conditionallyReverse(reversed, coordinates);
        return convertToString(word, orderedCoordinates);
    };
}
const swapXandY = (grid) => {
    const newGrid = [];
    grid.forEach((row, yIndex)=>{
        row.split('').forEach((character, xIndex)=>{
            if(!newGrid[xIndex]){
                newGrid[xIndex] = character
            } else {
                newGrid[xIndex] += character
            }
        });
    });
    return newGrid;
};
const searchVertically = (grid, word) => {
    const gridTransform = swapXandY(grid);
    const {startYIndex = startXIndex, startXIndex = startYIndex, reversed, foundWord} = getStartingCoordinateInfo(gridTransform, word);

    if(foundWord){
        const coordinates = range(0, word.length).map((index)=>`(${startXIndex},${startYIndex+index})`);
        const orderedCoordinates = conditionallyReverse(reversed, coordinates);
        return convertToString(word, orderedCoordinates);
    };
}



module.exports = (grid) => (word) => {
    return searchHorizontally(grid, word) || searchVertically(grid, word);
}