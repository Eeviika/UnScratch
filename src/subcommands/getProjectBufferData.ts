import AdmZip from "adm-zip";
export function getProjectBufferData(projectPath: string): Buffer | undefined {
	const zip = new AdmZip(projectPath);
	const zipEntries = zip.getEntries();

	for (const entry of zipEntries) {
		if (entry.entryName === "project.json") {
			return entry.getData();
		}
	}

	return undefined;
}
