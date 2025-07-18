import z from "zod";

export const ScratchMonitorSchema = z.object({
	id: z.string(),
	mode: z.string(),
	opcode: z.string(),
	params: z.record(z.string(), z.record(z.string(), z.string())),
	spriteName: z.string().optional(),
	value: z.number(),
	width: z.number(),
	height: z.number(),
	x: z.number(),
	y: z.number(),
	visible: z.boolean(),
	sliderMin: z.number(),
	sliderMax: z.number(),
	isDiscrete: z.boolean(),
});

export type ScratchMonitor = z.infer<typeof ScratchMonitorSchema>;
