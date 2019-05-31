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
    it('Live Test', (done)=>{
        const expectedLog = [
            'BONES: (0,6),(0,7),(0,8),(0,9),(0,10)',
            'KHAN: (5,9),(5,8),(5,7),(5,6)',
            'KIRK: (4,7),(3,7),(2,7),(1,7)',
            'SCOTTY: (0,5),(1,5),(2,5),(3,5),(4,5),(5,5)',
            'SPOCK: (2,1),(3,2),(4,3),(5,4),(6,5)',
            'SULU: (3,3),(2,2),(1,1),(0,0)',
            'UHURA: (4,0),(3,1),(2,2),(1,3),(0,4)',
            'CDZID: (10,14),(11,13),(12,12),(13,11),(14,10)',
        ].join('\n');
        const findWords = sinon.spy(require('../src/find-words'));
        let returnVal;
        proxyquire(MODULE_PATH,{
            './src/find-words': (args)=>{
                expect(findWords(args)).to.eql(expectedLog);
                done();
            }
        });
    })
})
