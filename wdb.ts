import fs = require('fs');
import iconv = require('iconv');

const iconV = new iconv.Iconv('cp1251', 'UTF-8');
function readString(ba:Buffer, offset:number, length:number):string {
	return iconV.convert(ba.slice(offset, offset + length)).toString();
}

class WDBMan {
	name:string = '_';
	comment:string = '_';
	year:number = 0;
	qualification:number = 0;
	group:number = 0;
	team:number = 0;
	number:number = 0;
	start:number = 0;
	finish:number = 0;
	result:number = 0;
	si_card:number = 0;
	id:number = 0;
	finished:number = 0;
	is_checked:boolean;
	is_not_qualified:boolean;
	is_without_team:boolean;
	unknown0:number = 0;
	is_own_card:number = 0;
	unknown2:number = 0;
	status:number = 0;
	start_group:number = 0;
	penalty_second:number = 0;
	
	parse(ba:Buffer, offset:number):void {
		this.name = readString(ba, offset, 25);
		this.comment = readString(ba, offset + 26, 20);
		this.year = ba.readInt16LE(offset + 48);
		this.qualification = ba.readInt16LE(offset + 50);
		this.group = ba.readInt16LE(offset + 52);
		this.team = ba.readInt16LE(offset + 52);
		this.unknown0 = ba.readInt8(offset + 56);
		/*
		this.team = int.from_bytes(byte_array[54:56], byteorder)
		this.unknown0 = int.from_bytes(byte_array[56:57], byteorder)
		this.number = int.from_bytes(byte_array[58:60], byteorder)
		this.start = int.from_bytes(byte_array[60:64], byteorder)
		this.finish = int.from_bytes(byte_array[64:68], byteorder)
		this.result = int.from_bytes(byte_array[68:72], byteorder)
		this.penalty_second = int.from_bytes(byte_array[80:82], byteorder)
		this.finished = int.from_bytes(byte_array[82:83], byteorder)
		this.si_card = int.from_bytes(byte_array[88:92], byteorder)
		this.id = int.from_bytes(byte_array[92:96], byteorder)
		this.is_checked = (byte_array[96] == 0x01)
		this.is_not_qualified = (byte_array[97] == 0x01)
		this.is_without_team = (byte_array[98] == 0x01)
		this.is_own_card = int.from_bytes(byte_array[100:101], byteorder)
		this.unknown2 = int.from_bytes(byte_array[104:105], byteorder)
		this.status = int.from_bytes(byte_array[108:109], byteorder)
		this.start_group = int.from_bytes(byte_array[156:160], byteorder)
		*/
	}
	
} //end class WDBMan

let ba:Buffer = fs.readFileSync('v1.wdb');

console.log('version:', ba.readInt32LE(0));

//man list
const manOneSize:number = 196;
const manCount:number = ba.readInt32LE(4);
console.log('man count:', manCount);
let count:number = manCount;
let offset:number = 8;
while (count > 0) {
	let man:WDBMan = new WDBMan();
	man.parse(ba, offset);
	console.log(man.name);
	offset += manOneSize;
	count--;
}

//team list
offset = 8 + manCount * manOneSize;
const teamOneSize:number = 56;
const teamCount:number = ba.readInt32LE(offset);

//group list
offset = 12 + manCount * manOneSize + teamCount * teamOneSize;
const groupOneSize:number = 36;
const groupCount:number = ba.readInt32LE(offset);

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