import z from "zod";

export const ScratchMonitorSchema = z.object({
	id: z.string(),
	mode: z.string(),
	opcode: z.string(),
	params: z.record(z.string(), z.string()),
	spriteName: z.string().nullable().optional(),
	value: z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()]))]),
	width: z.number(),
	height: z.number(),
	x: z.number(),
	y: z.number(),
	visible: z.boolean(),
	sliderMin: z.number().optional(),
	sliderMax: z.number().optional(),
	isDiscrete: z.boolean().optional(),
});

export type ScratchMonitor = z.infer<typeof ScratchMonitorSchema>;
