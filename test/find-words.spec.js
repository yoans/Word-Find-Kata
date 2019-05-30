const {expect} = require('chai');
const Chance = require('chance');
const chance = new Chance();
const {range} = require('ramda');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const MODULE_PATH = '../src/find-words';
describe('find words', ()=>{
    it('find a set of words in a grid', ()=>{
        const words = range(0,10).map((index)=>Symbol(`the specific word with index: ${index}`));
        const grid = Symbol('A Specific Grid');
        const findWord = sinon.stub();
        const findWordInGrid = sinon.stub();
        findWord.withArgs(grid).returns(findWordInGrid);
        const findWords = proxyquire(MODULE_PATH,{
            './find-word': findWord
        })
        const returnedStrings = [];
        const expectedCallArgs = words.map((word)=>{
            const randomString = chance.word();
            findWordInGrid.withArgs(word).returns(randomString);
            returnedStrings.push(randomString);
            return [word];
        });
        const result = findWords({grid,words});
        expect(findWordInGrid.args).to.eql(expectedCallArgs);
        expect(result).to.eql(returnedStrings.join('\n'));
    })
}) 