import AdmZip from "adm-zip";
import fs from "fs";
import { ScratchProject, ScratchProjectSchema } from "../scratchSchemas/scratchProjectSchema";

export function isValidZip(filePath: string): boolean {
	try {
		if (!hasZipHeader(filePath)) return false;
		new AdmZip(filePath); // real parse check
		return true;
	} catch {
		return false;
	}
}

export function hasZipHeader(filePath: string): boolean {
	const fd = fs.openSync(filePath, "r");
	const buffer = Buffer.alloc(4);
	fs.readSync(fd, buffer, 0, 4, 0);
	fs.closeSync(fd);

	return (
		buffer[0] === 0x50 &&
		buffer[1] === 0x4b &&
		buffer[2] === 0x03 &&
		buffer[3] === 0x04
	);
}

export function makeDirs(filePaths: string[]) {
	filePaths.forEach((path) => {
		fs.mkdirSync(path, { recursive: true });
	});
}

export function readScratchProject(path: string): ScratchProject {
  const raw = fs.readFileSync(path, "utf-8");
  const JSONData = JSON.parse(raw)
  return ScratchProjectSchema.parse(JSONData)
}