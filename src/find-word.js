module.exports = (grid) => (word) => {
    let startXIndex;
    let startYIndex;
    const didFindWord = grid.find((row, yIndex)=>{
        const xindex = row.indexOf(word)
            console.log(
               {xindex,
                row,word} 
            );
        if(xindex>=0){
            startXIndex = xindex;
            startYIndex = yIndex;
            return true 
        }
    })
    console.log(
       {didFindWord} 
    );
    if(didFindWord){
        const coordinates = Array.from({length: word.length}).map((_,index)=>`(${startXIndex+index},${startYIndex})`)
        return `${word}: ${coordinates}`
    }
}