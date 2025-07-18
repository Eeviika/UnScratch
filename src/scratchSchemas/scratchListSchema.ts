import z from "zod";

export const ScratchListSchema = z.object({
	name: z.string(),
	contents: z.array(z.union([z.string(), z.number()])),
});

export type ScratchList = z.infer<typeof ScratchListSchema>;
