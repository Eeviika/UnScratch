import z from "zod";

export const ProjectMetadataSchema = z.object({
	semver: z.string(),
	vm: z.string(),
	agent: z.string(),
	platform: z.record(z.string(), z.string()).optional(), // TurboWarp Compatibility
});

export type ProjectMetadata = z.infer<typeof ProjectMetadataSchema>;
