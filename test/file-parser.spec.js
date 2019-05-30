const fileParser = require('../src/file-parser');
const {expect} = require('chai');
const Chance = require('chance');
const chance = new Chance();
const {range} = require('ramda');
describe('parse word find file', ()=>{
    it('return expected format', ()=>{
        const expectedWords = range(0,10).map(()=>chance.word());
        const words = expectedWords.join(',');
        const grid = range(0,20).map(()=>range(0,20).map(()=>chance.word({length:1})).join(','));
        const expectedGrid = grid.map((row)=>row.split(',').join(''));
        const data = [words,...grid].join('\n');
        expect(fileParser(Buffer.from(data))).to.eql({words: expectedWords,grid: expectedGrid});
    })
}) 