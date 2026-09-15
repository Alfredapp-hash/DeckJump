import test from 'node:test';
import assert from 'node:assert/strict';
import {takeoff,toCSV} from '../src/takeoff.js';
const base = {width:20,depth:16,spacing:16,boardWidth:5.5,gap:0.125,waste:10};
test('20 by 16 fixture includes edges and waste, and stays partial',()=>{
 const result = takeoff(base);
 assert.equal(result.area,320);
 assert.equal(result.items[0].quantity,770);
 assert.equal(result.items[1].quantity,16);
 assert.equal(result.items[2].quantity,40);
 assert.equal(result.status,'partial');
 assert.ok(result.missing.includes('Footing design and concrete'));
});
test('fractional bay requires one more joist position',()=>{
 assert.equal(takeoff({...base,width:20.1}).items[1].quantity,17);
});
test('zero gap and zero waste are supported',()=>{
 assert.equal(takeoff({...base,depth:11,boardWidth:6,gap:0,waste:0}).items[0].quantity,440);
});
test('bad inputs fail before calculating',()=>{
 for (const key of Object.keys(base)) for (const value of [NaN,Infinity,-1,'20',null]) assert.throws(()=>takeoff({...base,[key]:value}));
 assert.throws(()=>takeoff({...base,width:101}));
});
test('CSV carries limitations with quantities',()=>{
 const csv = toCSV(takeoff(base));
 assert.match(csv,/NOT A PURCHASE ORDER/);
 assert.match(csv,/Footing design and concrete/);
 assert.match(csv,/"770","linear ft"/);
});
