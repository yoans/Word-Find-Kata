const findWord = require('../src/find-word');
const {expect} = require('chai');
const Chance = require('chance');
const chance = new Chance();
describe('find words', ()=>{
    it('basic search horizontally', ()=>{
        const grid = [['SCOTTY']];
        const word = chance.word();
        const coordinates = findWord(grid)(word);
        
        expect(coordinates).to.eql('SCOTTY: (0,0),(1,0),(2,0),(3,0),(4,0),(5,0)');
    })
})