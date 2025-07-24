import { Logger } from "../classes/logger";
import fs from "fs"
import path, { ParsedPath } from "path"
import { isValidZip } from "./utils/fsUtils";

export function validateProjectPath(projectPath: string, logger: Logger) {
	logger.verbose(`Checking to see if (${projectPath}) exists...`);

	if (!fs.existsSync(projectPath)) {
		throw new Error(`Path at (${projectPath}) does not exist.`);
	}

	logger.verbose("Exists! Checking to see if path is file...");

	if (!fs.statSync(projectPath).isFile()) {
		throw new Error(`Path at (${projectPath}) does not refer to a file.`);
	}

	logger.verbose("Is file! Checking to see if valid extension...");

	if (path.parse(projectPath).ext.toLowerCase() !== ".sb3") {
		throw new Error(`File at (${projectPath}) does not end with ".sb3".`);
	}

	logger.verbose("Valid! Checking if is ZIP...");

	if (!isValidZip(projectPath)) {
		throw new Error(`File at (${projectPath}) is not a valid .ZIP file.`);
	}

	logger.log("Project path is valid.");
}

export function createTargetDir(parsedProjectFile: ParsedPath, outputDirectory: string, logger: Logger): string {
	logger.verbose(
		`Checking if output directory (${outputDirectory}) is absolute`
	);
	logger.verbose("If not, converting...");

	outputDirectory = path.isAbsolute(outputDirectory)
		? outputDirectory
		: path.resolve(parsedProjectFile.dir, outputDirectory);

	logger.verbose(
		`Output directory (${outputDirectory}) may have changed.\nChecking for existence...`
	);

	if (!fs.existsSync(outputDirectory)) {
		const newOutput = parsedProjectFile.dir;
		logger.warn(
			`Cannot output a project folder to ${outputDirectory} as it does not exist. Outputting to ${newOutput} instead.`
		);
		outputDirectory = newOutput;
	}


	const targetDir = path.join(outputDirectory, parsedProjectFile.name);
		
	logger.verbose(
		`Preparing to output to (${targetDir}), checking if it exists first...`
	);

	if (fs.existsSync(targetDir)) {
		logger.err(
			`Need to extract to "${targetDir}", but it already exists.\nPlease rename or remove it first.`
		);
		process.exit(1);
	}

	return targetDir
}