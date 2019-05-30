// const findWord = require('../src/find-word');
const {expect} = require('chai');
const Chance = require('chance');
const chance = new Chance();
const {range} = require('ramda');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const MODULE_PATH = '../index';
describe.only('Run word find', ()=>{
        it('Loads sample puzzle from data folder', ()=>{
            const readFile = sinon.stub();
            proxyquire(MODULE_PATH,{
                fs:{
                    readFile
                }
            });
            readFile.args[0][1]();
            expect(readFile.args.length).to.eql(1);
            expect(readFile.args[0][0]).to.eql('./data/sample-grid.txt');
        })
})
