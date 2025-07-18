import z from "zod";

export const ScratchReporterSchema = z.array(z.union([z.string(), z.number()]));

export type ScratchReporter = z.infer<typeof ScratchReporterSchema>;
