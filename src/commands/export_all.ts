import fs from "fs";
import path from "path";
import { exit } from "process";
import { createTargetDir, validateProjectPath } from "../lib/cliValidator";
import { Logger } from "../classes/logger";
import { readScratchProject } from "../lib/utils/fsUtils";
import { exportGlobals } from "../subcommands/exportGlobals";
import { createProjectDirs } from "../subcommands/createProjectDirs";
import { exportAssets } from "../subcommands/exportAssets";
import { getProjectBufferData } from "../lib/getProjectBufferData";
import { askYesNo } from "../lib/input";

export async function exportAll(
	projectPath: string,
	outputDirectory: string,
	verbose: boolean
) {
	const logger: Logger = new Logger("ExportAllMain", verbose, false);
	logger.log("Beginning extraction of entire project...");

	validateProjectPath(projectPath, logger);

	const parsedProjectFile = path.parse(projectPath);

	const targetDir = createTargetDir(
		parsedProjectFile,
		outputDirectory,
		logger
	);

	await (async () => {
		const ok = await askYesNo(`Extracting "${projectPath}" to directory "${targetDir}". Is this okay? ([Y]/N)\n> `, true);
		if (!ok) {
			logger.log("Operation cancelled.");
			exit(0);
		}
		logger.log("Continuing with extraction...");
	})();

	const { imageDir, soundDir, dataDir } =
		createProjectDirs(targetDir, logger);

	exportAssets(projectPath, imageDir, soundDir, logger);

	logger.log("Extracted images / sounds.");

	logger.verbose("Reading project.json from project...");
	const projectBufferData = getProjectBufferData(projectPath);

	if (projectBufferData == undefined) {
		throw new Error(`Did not find "project.json" within project!`);
	}

	logger.verbose(
		"Converting project.json into a JSON object... may throw an error!"
	);
	const projectJsonData = readScratchProject(projectBufferData);

	exportGlobals(projectJsonData, targetDir, dataDir, logger)

	logger.log("Done!");
	logger.log(`Project extracted to "${targetDir}"`);
	logger.log("Extracted:");
	logger.log("-\tproject.json");
	logger.log(`-\t${fs.readdirSync(imageDir).length} images`);
	logger.log(`-\t${fs.readdirSync(soundDir).length} sounds`);
}
