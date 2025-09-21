// interface CLIOptions {
// 	verbose: boolean;
// 	dryRun: boolean;
// 	input: string;
// 	output: string;
// }
//
// class GlobalState {
// 	private static instance: GlobalState;
// 	public cliOptions: CLIOptions;
//
// 	private constructor() {
// 		this.cliOptions = {
// 			verbose: false,
// 			dryRun: false,
// 			input: "",
// 			output: "",
// 		};
// 	}
//
// 	public static getInstance(): GlobalState {
// 		if (!GlobalState.instance) {
// 			GlobalState.instance = new GlobalState();
// 		}
// 		return GlobalState.instance;
// 	}
//
// 	public initializeFromArgv(argv: any) {
// 		this.cliOptions = {
// 			verbose: !!argv.verbose,
// 			dryRun: !!argv.dryRun,
// 			input: argv.input || "",
// 			output: argv.output || "",
// 		};
// 	}
// }
//
// export const globalState = GlobalState.getInstance();
