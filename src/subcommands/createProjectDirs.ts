import { Logger } from "../classes/logger";
import fs from "fs";
import path from "path";
import { makeDirs } from "../lib/utils/fsUtils";

export function createProjectDirs(targetDir: string, logger: Logger): Record<string, string> {
      logger.verbose(`Attempting to create (${targetDir})...`);
      fs.mkdirSync(targetDir, { recursive: true });
      logger.log("Created root directory.");
    
      logger.verbose("Creating content directories...");
      const imageDir = path.join(targetDir, "assets", "images");
      const soundDir = path.join(targetDir, "assets", "sounds");
      const spriteDir = path.join(targetDir, "sprites");
      const dataDir = path.join(targetDir, "data");
      const codeDir = path.join(targetDir, "code");
    
      makeDirs([imageDir, soundDir, spriteDir, dataDir, codeDir]);
      logger.log("Created content directories.");

      return {
        imageDir: imageDir,
        soundDir: soundDir,
        spriteDir: spriteDir,
        dataDir: dataDir,
        codeDir: codeDir
      }
}