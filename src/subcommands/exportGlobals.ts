import { Logger } from "../classes/logger";
import { ScratchProject } from "../scratchSchemas/scratchProjectSchema";
import fs from "fs"
import path from "path"

const DUMMY_AGENT_STRING =
	"Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0";

export function exportGlobals(projectJsonData: ScratchProject, targetDir: string, dataDir:string, logger: Logger) {
    logger.verbose("Replacing agent in metadata with dummy string...");

	projectJsonData.meta.agent = DUMMY_AGENT_STRING;

	logger.verbose("Looking for Stage (globals) sprite...");

	const stage = projectJsonData.targets.find(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(target: any) => target.isStage === true
	);

	if (!stage) {
		throw new Error("Could not find the Stage!");
	}

	logger.verbose("Found globals! Exporting global vars...");

	const globalVariables: Record<
		string,
		Record<string, string | number | boolean>
	> = {};

	Object.entries(stage.variables).forEach((v) => {
		globalVariables[v[0]] = {
			name: v[1][0],
			value: v[1][1],
		};
	});

	const globalVariablesJSON = JSON.stringify(globalVariables, null, 2);
	logger.verbose("Got global variables.");
	logger.verbose("Exporting global lists...");

	const globalLists: Record<
		string,
		{
			name: string;
			contents: Array<string | number | boolean>;
		}
	> = {};

	Object.entries(stage.lists).forEach((v) => {
		if (!Array.isArray(v[1][1])) {
			throw new Error("Lists must have an ARRAY in index 1.");
		}
		globalLists[v[0]] = {
			name: v[1][0].toString(),
			contents: v[1][1],
		};
	});

	const globalListsJSON = JSON.stringify(globalLists, null, 2)
	logger.verbose("Got global lists.")
	logger.verbose("Exporting broadcasts...")

	fs.writeFileSync(
		path.join(targetDir, "project.json"),
		JSON.stringify(projectJsonData.meta, null, 2)
	);
	
	fs.writeFileSync(
		path.join(dataDir, "global_variables.json"),
		globalVariablesJSON
	);

	fs.writeFileSync(
		path.join(dataDir, "global_lists.json"),
		globalListsJSON
	);

	fs.writeFileSync(
		path.join(dataDir, "broadcasts.json"),
		JSON.stringify(stage.broadcasts, null, 2)
	);
}