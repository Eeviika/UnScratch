import z from "zod";

export const ScratchCostumeSchema = z.object({
	name: z.string(),
	bitmapResolution: z.number().optional(),
	dataFormat: z.string(),
	assetId: z.string(),
	md5ext: z.string(),
	rotationCenterX: z.number(),
	rotationCenterY: z.number(),
});

export type ScratchCostume = z.infer<typeof ScratchCostumeSchema>;
