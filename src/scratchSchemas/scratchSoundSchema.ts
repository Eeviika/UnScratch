import z from "zod";

export const ScratchSoundSchema = z.object({
	name: z.string(),
	assetId: z.string(),
	dataFormat: z.string(),
	format: z.string().optional(),
	rate: z.number(),
	sampleCount: z.number(),
	md5ext: z.string(),
});

export type ScratchSound = z.infer<typeof ScratchSoundSchema>;
