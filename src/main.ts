import WDB from './WDB';
import fs = require('fs');

WDB.buffer = fs.readFileSync('cup_city_5.wdb');

console.log(WDB.getMemberCount());

/*
//course list
offset = 16 + manCount * manOneSize + teamCount * teamOneSize + groupCount * groupCount;
const courseOneSize:number = 352;
const courseCount:number = ba.readInt32LE(offset);

//info block
offset = 20 + manCount * manOneSize + teamCount * teamOneSize + groupCount * groupCount + courseCount * courseOneSize;
const infoBlockSize:number = 1556;

//finish list
offset = 20 + manCount * manOneSize + teamCount * teamOneSize + groupCount * groupCount + courseCount * courseOneSize + infoBlockSize;
const finishOneSize:number = 12;
const finishCount:number = ba.readInt32LE(offset);

offset = 24 + manCount * manOneSize + teamCount * teamOneSize + groupCount * groupCount + courseCount * courseOneSize + infoBlockSize + finishCount * finishOneSize;
let siPunchCount:number = 64; //количество отметок
let chipCount:number = ba.readInt32LE(offset);
if (chipCount === 0) {
	let check:number = ba.readInt32LE(offset + 4);
	if (check === 257) {
		siPunchCount = 200;
		offset += 4;
		const advOneSize:number = 88;
		offset += advOneSize * check;
	}
	chipCount = ba.readInt32LE(offset);
	offset += 4;
}
const chipOneSize:number = 44 + 8 * siPunchCount;
*/