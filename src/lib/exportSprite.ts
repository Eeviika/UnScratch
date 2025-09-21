import path from "path";
import { Logger } from "../classes/logger";
import { ScratchSprite } from "../scratchSchemas/scratchSpriteSchema";
import fs from "fs";

export function exportSprite (
    sprite: ScratchSprite,
    dataDir: string,
    spriteDir: string,
    codeDir: string,
    logger: Logger
) {
    logger.verbose(`Exporting sprite "${sprite.name}"...`);

    if (sprite.isStage) {
        logger.warn("Cannot export a Stage as a sprite (use exportGlobals instead). Skipping export.");
        return;
    }
    
    const newSpriteData = {
        name: sprite.name,
        x: sprite.x ?? 0, // Default to 0 if x is undefined
        y: sprite.y ?? 0, // Default to 0 if y is undefined
        size: sprite.size ?? 100,
        direction: sprite.direction ?? 90,
        visible: sprite.visible ?? true,
        layerOrder: sprite.layerOrder ?? 0,
        costumes: sprite.costumes,
        sounds: sprite.sounds,
        draggable: sprite.draggable ?? false,
        volume: sprite.volume ?? 100,
        tempo: sprite.tempo ?? 60,
        videoTransparency: sprite.videoTransparency ?? 0,
        textToSpeechLanguage: sprite.textToSpeechLanguage ?? null,
        videoState: sprite.videoState ?? "off",
        rotationStyle: sprite.rotationStyle ?? "normal",
        // blocks: sprite.blocks, will be exported to codeDir
        // comments: sprite.comments, will be exported to codeDir
        // variables: sprite.variables, will be exported to dataDir
        // lists: sprite.lists, will be exported to dataDir
        // broadcasts: sprite.broadcasts, literally not used in Scratch 3.0 unless the sprite is a Stage
        currentCostume: sprite.currentCostume,
    }

    const spriteFilePath = path.join(spriteDir, `${sprite.name}.json`);
    logger.verbose(`Writing sprite data to ${spriteFilePath}...`);
    const spriteData = JSON.stringify(newSpriteData, null, 2);
    fs.writeFileSync(spriteFilePath, spriteData);


}