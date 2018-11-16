import fs = require('fs');
import iconv = require('iconv');

let ba:Buffer = fs.readFileSync('v1.wdb');

console.log('version:', ba.readUInt32LE(0));
let count:number = ba.readUInt32LE(4);
console.log('man count:', count);
if (count > 0) {
	console.log(new iconv.Iconv('cp1251', 'UTF-8').convert(ba.slice(8, 25)).toString());
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
	
	parse(ba:Buffer):void {
		/*
		this.name = encode(byte_array[0:25])
		this.comment = encode(byte_array[26:46])
		this.year = int.from_bytes(byte_array[48:50], byteorder)
		this.qualification = int.from_bytes(byte_array[50:52], byteorder)
		this.group = int.from_bytes(byte_array[52:54], byteorder)
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