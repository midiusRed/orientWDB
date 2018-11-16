import WDB from './WDB';

export default class WDBGroup {
	id:number;
	name:string;
	qual_kms:number;
	qual_ms:number;
	distance_id:number;
	people_in_base:number;
	people_finished:number;
	people_selected:number;
	qual_mode:number;
	rent_cost:number;
	rent_discount_cost:number;
	owner_cost:number;
	owner_discount_cost:number;
	unused1:number;
	
	parse():WDBGroup {
		const group:WDBGroup = new WDBGroup();
		group.id = WDB.readNumber4(0);
		group.name = WDB.readString(4, 10);
		group.qual_kms = WDB.readNumber1(13);
		group.qual_ms = WDB.readNumber1(14);
		group.distance_id = WDB.readNumber2(16);
		group.people_in_base = WDB.readNumber2(18);
		group.people_finished = WDB.readNumber2(20);
		// group.people_selected = int.from_bytes(byte_array[22:24], byteorder)
		// group.qual_mode = int.from_bytes(byte_array[24:25], byteorder)
		// group.rent_cost = int.from_bytes(byte_array[26:28], byteorder)
		// group.rent_discount_cost = int.from_bytes(byte_array[28:30], byteorder)
		// group.owner_cost = int.from_bytes(byte_array[30:32], byteorder)
		// group.owner_discount_cost = int.from_bytes(byte_array[32:34], byteorder)
		// group.unused1 = int.from_bytes(byte_array[34:36], byteorder)
		return group;
	}
	
} //end class WDBGroup