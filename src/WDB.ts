import iconv = require('iconv');

namespace WDB {
	const iconV = new iconv.Iconv('cp1251', 'UTF-8');

	export let buffer:Buffer;
	export let localOffset:number = 0;
	// console.log('version:', readNumber4(0, false));
	
	export function readString(offset:number, length:number, isLocal:boolean = true):string {
		if (isLocal) {
			offset += localOffset;
		}
		length += offset;
		for (let i:number = offset; i <= length; i++) {
			if (buffer.readUInt8(i) === 0) {
				length = i;
				break;
			}
		}
		return length > offset ? iconV.convert(buffer.slice(offset, length)).toString() : '';
	}

	export function readNumber4(offset:number, isLocal:boolean = true):number {
		if (isLocal) {
			offset += localOffset;
		}
		return buffer.readUInt32LE(offset);
	}

	export function readNumber2(offset:number, isLocal:boolean = true):number {
		if (isLocal) {
			offset += localOffset;
		}
		return buffer.readUInt16LE(offset);
	}

	export function readNumber1(offset:number, isLocal:boolean = true):number {
		if (isLocal) {
			offset += localOffset;
		}
		return buffer.readUInt8(offset);
	}
	
	export const MEMBER_SIZE:number = 196;
	export function toMemberOffset(index:number = 0):number {
		return 8 + index * MEMBER_SIZE;
	}
	
	export function getMemberCount():number {
		return readNumber4(4, false);
	}

	export const TEAM_SIZE:number = 56;
	export function toTeamOffset(index:number = 0):number {
		return toMemberOffset(getMemberCount()) + 4 + index * TEAM_SIZE;
	}
	
	export function getTeamCount():number {
		return readNumber4(toTeamOffset() - 4, false);
	}

	export const GROUP_SIZE:number = 36;
	export function toGroupOffset(index:number = 0):number {
		return toTeamOffset(getTeamCount()) + 4 + index * GROUP_SIZE;
	}

	export function getGroupCount():number {
		return readNumber4(toGroupOffset() - 4, false);
	} 

}
export default WDB;