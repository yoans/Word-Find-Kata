module.exports = (data) => {
    const stringData = data.toString('utf8').split('\n');
    const words = stringData.shift().split(',');
    const grid = stringData.map((row)=>row.split(',').join(''))
    return {words, grid}
}