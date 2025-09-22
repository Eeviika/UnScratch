import { Logger } from "../classes/logger";
import { ScratchProject } from "../scratchSchemas/scratchProjectSchema";
import fs from "fs";
import path from "path";
import { JSONParseLists, JSONParseVariables } from "../lib/utils/dataUtils";

const DUMMY_AGENT_STRING =
	"Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0";

export function exportGlobals(
	projectJsonData: ScratchProject,
	targetDir: string,
	dataDir: string,
	logger: Logger,
) {
	logger.verbose("Replacing agent in metadata with dummy string...");

	projectJsonData.meta.agent = DUMMY_AGENT_STRING;

	logger.verbose("Looking for Stage (globals) sprite...");

	const stage = projectJsonData.targets.find(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(target: any) => target.isStage === true,
	);

	if (!stage) {
		throw new Error("Could not find the Stage!");
	}

	logger.verbose("Found globals!");

	logger.verbose("Exporting project metadata...");
	fs.writeFileSync(
		path.join(targetDir, "project.json"),
		JSON.stringify(projectJsonData.meta, null, 2),
	);

	logger.verbose("Exporting global variables and lists...");
	fs.writeFileSync(
		path.join(dataDir, "global..variables.json"),
		JSONParseVariables(stage),
	);

	fs.writeFileSync(
		path.join(dataDir, "global..lists.json"),
		JSONParseLists(stage),
	);

	logger.verbose("Exporting broadcasts...");
	fs.writeFileSync(
		path.join(dataDir, "global..broadcasts.json"),
		JSON.stringify(stage.broadcasts, null, 2),
	);

	logger.log("Exported globals.");
}
