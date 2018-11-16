import WDB from './WDB';

export default class WDBMember {
	name:string;
	comment:string;
	year:number;
	qualification:number;
	group:number;
	team:number;
	num:number;
	start:number;
	finish:number;
	result:number;
	si_card:number;
	id:number;
	finished:number;
	is_checked:boolean;
	is_not_qualified:boolean;
	is_without_team:boolean;
	unknown0:number;
	is_own_card:number;
	unknown2:number;
	status:number;
	start_group:number;
	penalty_second:number;

	static parse():WDBMember {
		const member:WDBMember = new WDBMember();
		member.name = WDB.readString(0, 25);
		member.comment = WDB.readString(26, 20);
		member.year = WDB.readNumber2(48);
		member.qualification = WDB.readNumber2(50);
		member.group = WDB.readNumber2(52);
		member.team = WDB.readNumber2(54);
		// member.unknown0 = WDB.readNumber1(56);
		member.num = WDB.readNumber2(58);
		member.start = WDB.readNumber4(60);
		member.finish = WDB.readNumber4(64);
		member.result = WDB.readNumber4(68);
		member.penalty_second = WDB.readNumber2(80);
		member.finished = WDB.readNumber1(82);
		member.si_card = WDB.readNumber4(88);
		member.id = WDB.readNumber4(92);
		member.is_checked = WDB.readNumber1(96) === 1;
		// member.is_not_qualified = (byte_array[97] == 0x01)
		// member.is_without_team = (byte_array[98] == 0x01)
		member.is_own_card = WDB.readNumber1(100);
		// member.unknown2 = int.from_bytes(byte_array[104:105], byteorder)
		member.status = WDB.readNumber1(108);
		// member.start_group = int.from_bytes(byte_array[156:160], byteorder)
		return member;
	}
	
	toString():string {
		return `${this.name} ${this.year}`;
	}

} //end class WDBMember