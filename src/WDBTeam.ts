import WDB from './WDB';

export default class WDBTeam {
	id:number;
	name:string;
	refferent;
	country:number;
	region:number;
	people_in_base:number;
	people_finished:number;
	people_selected:number;
	is_selected:boolean;
	
	static parse():WDBTeam {
		const team:WDBTeam = new WDBTeam();
		team.id = WDB.readNumber4(0);
		team.name = WDB.readString(4, 21);
		team.refferent = WDB.readString(25, 19);
		team.country = WDB.readNumber1(44);
		team.region = WDB.readNumber1(45);
		team.people_in_base = WDB.readNumber2(46);
		team.people_finished = WDB.readNumber2(48);
		team.people_selected = WDB.readNumber2(50);
		team.is_selected = WDB.readNumber1(52) === 1;
		return team;
	}
	
	toString():string {
		return `Коллектив: "${this.name}", Представитель: "${this.refferent}", Регион: "${this.region}", В базе: ${this.people_in_base}, Финишировало: ${this.people_finished}, Отмечено: ${this.people_selected}`;
	}
	
} //end class WDBTeam