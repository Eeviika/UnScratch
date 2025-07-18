import z from "zod";

export const ScratchVariableSchema = z.object({
	name: z.string(),
	value: z.union([z.number(), z.string()]),
});

export type ScratchVariable = z.infer<typeof ScratchVariableSchema>;
