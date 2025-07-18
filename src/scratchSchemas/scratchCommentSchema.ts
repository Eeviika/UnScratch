import z from "zod";

export const ScratchCommentSchema = z.object({
	blockId: z.string().nullable().optional(),
	x: z.number(),
	y: z.number(),
	width: z.number(),
	height: z.number(),
	minimized: z.boolean(),
	text: z.string(),
});

export type ScratchComment = z.infer<typeof ScratchCommentSchema>;
