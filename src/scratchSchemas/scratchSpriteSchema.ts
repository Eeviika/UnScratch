import z from "zod";

import { ScratchCostumeSchema } from "./scratchCostumeSchema";
import { ScratchSoundSchema } from "./scratchSoundSchema";
import { ScratchVariableSchema } from "./scratchVariableSchema";
import { ScratchListSchema } from "./scratchListSchema";
import { ScratchBlockSchema } from "./scratchBlockSchema";
import { ScratchCommentSchema } from "./scratchCommentSchema";

export const ScratchSpriteSchema = z.object({
	isStage: z.boolean(),
	name: z.string(),
	currentCostume: z.number(),
	volume: z.number(),
	layerOrder: z.number(),
	tempo: z.number().optional(),
	videoTransparency: z.number().optional(),
	textToSpeechLanguage: z.string().nullable().optional(),
	videoState: z.string().optional(),
	variables: z.record(z.string(), ScratchVariableSchema),
	lists: z.record(z.string(), ScratchListSchema),
	broadcasts: z.record(z.string(), z.string()),
	blocks: z.record(z.string(), ScratchBlockSchema),
	comments: z.record(z.string(), ScratchCommentSchema),
	costumes: z.array(ScratchCostumeSchema),
	sounds: z.array(ScratchSoundSchema),
});

export type ScratchSprite = z.infer<typeof ScratchSpriteSchema>;
