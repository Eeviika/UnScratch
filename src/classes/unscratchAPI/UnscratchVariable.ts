export class UnscratchVariable {
	name: string = "";
	value: string | boolean | number = "";

	constructor(nam: string, val: string | boolean | number) {
		this.name = nam;
		this.value = val;
	}
}
