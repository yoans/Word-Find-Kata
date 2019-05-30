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
        const reversedWord = word.split('').reverse().join('');
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
const shiftColumnsUpByYIndex = (grid) => {
    const newGrid = [];
    grid.forEach((row, yIndex)=>{
        row.split('').forEach((character, xIndex)=>{
            if(!newGrid[yIndex+xIndex]){
                newGrid[yIndex+xIndex] = []
            }
            newGrid[yIndex+xIndex].push(character) 
        });
    });
    return newGrid.map(row=>row.join('')); 
};
const shiftColumnsDownByYIndex = (grid) => {
    const newGrid = [];
    grid.forEach((row, yIndex)=>{
        const maxIndex = row.length-1; 
        row.split('').reverse().forEach((character, xIndex)=>{
            if(!newGrid[yIndex+xIndex]){
                newGrid[yIndex+xIndex] = range(0,maxIndex-xIndex).map(()=>'-')
            }
            newGrid[yIndex+xIndex].push(character) 
        });
    });
    return newGrid.map(row=>row.join('')); 
};
const searchVertically = (grid, word) => {
    const gridTransform = swapXandY(grid);
    const {startYIndex, startXIndex, reversed, foundWord} = getStartingCoordinateInfo(gridTransform, word);
    if(foundWord){
        const coordinates = range(0, word.length).map((index)=>`(${startYIndex},${startXIndex+index})`);
        const orderedCoordinates = conditionallyReverse(reversed, coordinates);
        return convertToString(word, orderedCoordinates);
    };
}
const searchAscending = (grid, word) => {
    const gridTransform = shiftColumnsUpByYIndex(grid);

    const {startYIndex, startXIndex, reversed, foundWord} = getStartingCoordinateInfo(gridTransform, word);
    if(foundWord){
        const coordinates = range(0, word.length).map((index)=>`(${startXIndex+startYIndex-index},${startXIndex+index})`);
        const orderedCoordinates = conditionallyReverse(reversed, coordinates);
        return convertToString(word, orderedCoordinates);
    };
}
const searchDescending = (grid, word) => {
    const gridTransform = shiftColumnsDownByYIndex(grid);
    const {startYIndex, startXIndex, reversed, foundWord} = getStartingCoordinateInfo(gridTransform, word);
    console.log({gridTransform});
    if(foundWord){
        const calculatedXStart = startXIndex;
        const calculatedYStart = startYIndex+startXIndex-grid.length+1;
    console.log({startYIndex, startXIndex, reversed, foundWord,wordlength: word.length,calculatedYStart});
        const coordinates = range(0, word.length).map((index)=>`(${calculatedXStart+index},${calculatedYStart+index})`);
        const orderedCoordinates = conditionallyReverse(reversed, coordinates);
        return convertToString(word, orderedCoordinates);
    };
}

module.exports = (grid) => (word) => {
    return searchHorizontally(grid, word) || searchVertically(grid, word) || searchAscending(grid, word) || searchDescending(grid, word);
}