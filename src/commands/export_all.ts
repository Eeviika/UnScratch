import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import { exit } from "process";
import readline from "readline";
import { createTargetDir, validateProjectPath } from "../lib/cliValidator";
import { Logger } from "../classes/logger";
import { makeDirs } from "../lib/fsUtils";

// const DUMMY_AGENT_STRING =
// 	"Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0";

function askYesNo(
	prompt: string,
	yesDefault: boolean = false
): Promise<boolean> {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	return new Promise((resolve) => {
		rl.question(prompt, (answer) => {
			rl.close();
			const val = answer.trim().toLowerCase();
			resolve((val === "" && yesDefault) || val === "y" || val === "yes");
		});
	});
}

function endsWithAny(checkString: string, endsWith: string[]): boolean {
	return endsWith.some((ext) => checkString.toLowerCase().endsWith(ext));
}

export async function exportAll(
	projectPath: string,
	outputDirectory: string,
	verbose: boolean
) {
	const logger: Logger = new Logger("ExportAllMain", verbose, false);
	logger.log("Beginning extraction of entire project...");

	validateProjectPath(projectPath, logger);

	const parsedProjectFile = path.parse(projectPath);

	const targetDir = createTargetDir(parsedProjectFile, outputDirectory, logger)

	await (async () => {
		logger.log(
			`Extracting "${projectPath}" to directory "${targetDir}". Is this okay? ([Y]/N)`
		);
		const ok = await askYesNo("> ", true);
		if (!ok) {
			logger.log("Operation cancelled.");
			exit(0);
		}
	})();

	// Unzip the current project.
	const projectZip = new AdmZip(projectPath);
	const zipEntries = projectZip.getEntries();

	// Create a directory with the project name from targetDir.

	logger.verbose(`Attempting to create (${targetDir})...`);
	fs.mkdirSync(targetDir, { recursive: true });
	logger.log("Created root directory.");

	logger.verbose("Creating content directories...");
	const imageDir = path.join(targetDir, "assets", "images");
	const soundDir = path.join(targetDir, "assets", "sounds");
	const spriteDir = path.join(targetDir, "sprites");
	const dataDir = path.join(targetDir, "data");
	const codeDir = path.join(targetDir, "code");

	makeDirs([imageDir, soundDir, spriteDir, dataDir, codeDir]);
	logger.log("Created content directories.");

	let projectBufferData: Buffer<ArrayBufferLike> | undefined;

	// Directly export sounds and images.

	logger.verbose("Directly exporting sounds & images...");
	zipEntries.forEach((zipEntry) => {
		logger.verbose(`Exporting (${zipEntry.entryName})...`);
		if (zipEntry.isDirectory) {
			logger.verbose("It was a directory, so it was not exported.");
			return;
		}

		if (zipEntry.entryName == "project.json") {
			// TODO: Actually process project.json
			projectBufferData = zipEntry.getData();
			return;
		}
		if (
			endsWithAny(zipEntry.entryName, [
				".png",
				".svg",
				".bmp",
				".jpeg",
				".webp",
			])
		) {
			// Trying to cover my bases here
			logger.verbose("Exporting to images directory...");
			const buffer = zipEntry.getData();
			const imageOutPath = path.join(
				imageDir,
				path.basename(zipEntry.entryName)
			);
			fs.writeFileSync(imageOutPath, buffer);
			logger.verbose("Done!");
			return;
		}

		if (endsWithAny(zipEntry.entryName, [".mp3", ".wav", ".ogg"])) {
			// Same here
			logger.verbose("Exporting to sounds directory...");
			const buffer = zipEntry.getData();
			const soundOutPath = path.join(
				soundDir,
				path.basename(zipEntry.entryName)
			);
			fs.writeFileSync(soundOutPath, buffer);
			logger.verbose("Done!");
			return;
		}
	});

	logger.log("Extracted images / sounds.");

	// For right now, just going to export project.json directly
	// TODO: Actually process project.json

	if (projectBufferData == undefined) {
		throw new Error(`Did not find "project.json" within project!`);
	}

	logger.verbose("Converting project.json into a JSON object...");
	const projectJsonData = JSON.parse(projectBufferData.toString("utf-8"));

	logger.verbose("Looking for Stage (globals) sprite...");

	const stage = projectJsonData.targets.find(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(target: any) => target.isStage === true
	);

	if (!stage) {
		throw new Error("Could not find the Stage!");
	}

	logger.verbose(
		"Found globals! Exporting global vars / lists / broadcasts..."
	);

	const globalVariables = Object.entries(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		stage.variables as Record<string, [string, any]>
	).map(([id, [name, value]]) => ({
		id,
		name,
		value,
	}));

	logger.verbose("Got vars...");

	const globalLists = Object.entries(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		stage.lists as Record<string, [string, any[]]>
	).map(([id, [name, values]]) => ({
		id,
		name,
		values,
	}));

	logger.verbose("Got lists...");

	const broadcasts = Object.entries(stage.broadcasts).map(([id, name]) => ({
		id,
		name,
	}));

	logger.verbose("Got broadcasts...");

	logger.verbose("Exporting...");

	fs.writeFileSync(
		path.join(dataDir, "global_variables.json"),
		JSON.stringify(globalVariables, null, 2)
	);
	fs.writeFileSync(
		path.join(dataDir, "global_lists.json"),
		JSON.stringify(globalLists, null, 2)
	);
	fs.writeFileSync(
		path.join(dataDir, "broadcasts.json"),
		JSON.stringify(broadcasts, null, 2)
	);
	fs.writeFileSync(
		path.join(targetDir, "project.json"),
		JSON.stringify(projectJsonData.meta, null, 2)
	);

	logger.log("Done!");
	logger.log(`Project extracted to "${targetDir}"`);
	logger.log("Extracted:");
	logger.log("-\tproject.json");
	logger.log(`-\t${fs.readdirSync(imageDir).length} images`);
	logger.log(`-\t${fs.readdirSync(soundDir).length} sounds`);
}
