const {expect} = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const MODULE_PATH = '../index';
describe('Run word find', ()=>{
    it('Loads sample puzzle from data folder', ()=>{
        const err = undefined;
        const data = Symbol('Data from sample file');
        const readFile = sinon.stub();
        const fileParser = sinon.stub();
        const parsedData = Symbol('Parsed data');
        fileParser.withArgs(data).returns(parsedData);
        const findWords = sinon.stub();
        findWords.withArgs(parsedData).returns(parsedData);
        
        proxyquire(MODULE_PATH,{
            fs:{
                readFile
            },
            './src/file-parser': fileParser,
            './src/find-words': findWords
        });
        readFile.args[0][1](err, data);
        
        expect(readFile.args.length).to.eql(1);
        expect(readFile.args[0][0]).to.eql('./data/sample-grid.txt');
        expect(fileParser.args).to.eql([[data]]);
        expect(findWords.args).to.eql([[parsedData]]);
    })
})
