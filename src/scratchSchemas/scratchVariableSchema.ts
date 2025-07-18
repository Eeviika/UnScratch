import z from "zod";

export const ScratchVariableSchema = z.array(z.union([z.number(), z.string()]));

export type ScratchVariable = z.infer<typeof ScratchVariableSchema>;
