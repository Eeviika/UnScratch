import z from "zod";

export const ScratchVariableSchema = z.array(
	z.union([z.number(), z.string(), z.boolean()]),
);

export type ScratchVariable = z.infer<typeof ScratchVariableSchema>;
