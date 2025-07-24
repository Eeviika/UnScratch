import { Logger } from "../classes/logger";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";
import { endsWithAny } from "../lib/utils/stringUtils";

export function exportAssets(
	projectPath: string,
	imageDir: string,
	soundDir: string,
	logger: Logger,
) {
	// Unzip the current project.
	const projectZip = new AdmZip(projectPath);
	const zipEntries = projectZip.getEntries();

	// Directly export sounds and images.

	logger.verbose("Directly exporting sounds & images...");
	zipEntries.forEach((zipEntry) => {
		logger.verbose(`Exporting (${zipEntry.entryName})...`);
		if (zipEntry.isDirectory) {
			logger.verbose("It was a directory, so it was not exported.");
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
				path.basename(zipEntry.entryName),
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
				path.basename(zipEntry.entryName),
			);
			fs.writeFileSync(soundOutPath, buffer);
			logger.verbose("Done!");
			return;
		}
	});
}
