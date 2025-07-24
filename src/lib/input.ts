import readline from "readline";

export function askYesNo(
	prompt: string,
	yesDefault: boolean = false,
): Promise<boolean> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	if (yesDefault) {
		prompt += " [Y/n] ";
	} else {
		prompt += " [y/N] ";
	}

	return new Promise((resolve) => {
		rl.question(prompt, (answer) => {
			rl.close();
			const val = answer.trim().toLowerCase();
			resolve((val === "" && yesDefault) || val === "y" || val === "yes");
		});
	});
}
