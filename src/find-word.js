module.exports = (grid) => (word) => {
    let startXIndex;
    let startYIndex;
    let reversed;
    const didFindWord = grid.find((row, yIndex)=>{
        let xindex = row.indexOf(word)
        startYIndex = yIndex;

        if(xindex>=0){
            startXIndex = xindex;
            return true 
        }
        
        xindex = row.indexOf(word.split('').reverse().join());

        if(xindex>=0){
            startXIndex = xindex;
            reversed = true;
            return true 
        }
    })

    if(didFindWord){
        const coordinates = Array.from({length: word.length}).map((_,index)=>`(${startXIndex+index},${startYIndex})`);
        let orderdCoordinates = coordinates;
        if(reversed){
            orderdCoordinates = coordinates.reverse();
        }
        return `${word}: ${orderdCoordinates}`
    }
}