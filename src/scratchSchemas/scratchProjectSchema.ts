import z from "zod";
import { ScratchSpriteSchema } from "./scratchSpriteSchema";
import { ScratchMonitorSchema } from "./scratchMonitorSchema";
import { ProjectMetadataSchema } from "./projectMetaSchema";

export const ScratchProjectSchema = z.object({
	targets: z.array(ScratchSpriteSchema),
	monitors: z.array(ScratchMonitorSchema),
	extensions: z.array(z.string()),
	extensionURLs: z.record(z.string(), z.string()).optional(), // TurboWarp Compatibility
	meta: ProjectMetadataSchema,
});

export type ScratchProject = z.infer<typeof ScratchProjectSchema>;
