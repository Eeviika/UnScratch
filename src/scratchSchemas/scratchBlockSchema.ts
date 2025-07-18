import z from "zod";

export const ScratchBlockSchema = z.object({
	opcode: z.string(),
	shadow: z.boolean(),
	topLevel: z.boolean(),
	x: z.number().optional(),
	y: z.number().optional(),
	next: z.string().nullable().optional(),
	parent: z.string().nullable().optional(),
});

export type ScratchBlock = z.infer<typeof ScratchBlockSchema>;
