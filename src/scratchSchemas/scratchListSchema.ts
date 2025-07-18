import z from "zod";

export const ScratchListSchema = z.array(z.union([z.string(), z.array(z.union([z.string(), z.number()]))]));

export type ScratchList = z.infer<typeof ScratchListSchema>;
