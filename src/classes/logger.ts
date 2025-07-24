export class Logger {
	readonly id: string;
	readonly isVerbose: boolean;
	private outId: boolean;

	constructor(id: string, verbose: boolean, outId: boolean) {
		this.id = id;
		this.isVerbose = verbose;
		this.outId = outId;
	}

	public get getOutId(): boolean {
		return this.outId;
	}

	public set setOutId(val: boolean) {
		this.outId = val;
	}

	verbose(message: string) {
		if (!this.isVerbose) {
			return;
		}
		if (this.outId) {
			message = `[${this.id}] ` + message;
		}
		message = "[VERBOSE] " + message;

		console.log(message);
	}

	log(message: string) {
		if (this.outId) {
			message = `[${this.id}] ` + message;
		}

		console.log(message);
	}

	warn(message: string) {
		if (this.outId) {
			message = `[${this.id}] ` + message;
		}
		message = "[WARN] " + message;

		console.warn(message);
	}

	err(message: string) {
		if (this.outId) {
			message = `[${this.id}] ` + message;
		}
		message = "[ERR] " + message;

		console.error(message);
	}
}
