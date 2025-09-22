import { ScratchSprite } from "../../scratchSchemas/scratchSpriteSchema";

export function JSONParseVariables(sprite: ScratchSprite): string {
	const variables: Record<
		string,
		Record<string, string | number | boolean>
	> = {};

	Object.entries(sprite.variables).forEach((v) => {
		variables[v[0]] = {
			name: v[1][0],
			value: v[1][1],
		};
	});

	return JSON.stringify(variables, null, 2);
}

export function JSONParseLists(sprite: ScratchSprite): string {
	const lists: Record<
		string,
		{
			name: string;
			contents: Array<string | number | boolean>;
		}
	> = {};

	Object.entries(sprite.lists).forEach((v) => {
		if (!Array.isArray(v[1][1])) {
			throw new Error("Lists must have an Array[Variant] in index 1.");
		}
		lists[v[0]] = {
			name: v[1][0].toString(),
			contents: v[1][1],
		};
	});

	return JSON.stringify(lists, null, 2);
}
