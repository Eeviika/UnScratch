#!/usr/bin/env node 

import yargs from "yargs";
import { hideBin } from "yargs/helpers"
import { exportAll } from "./commands/export_all";

interface ExportAllArgs {
	projectPath: string;
	outputDirectory: string;
	verbose?: boolean;
}

yargs(hideBin(process.argv))
    .command<ExportAllArgs>("export_all <projectPath> [outputDirectory]", "exports the scratch project in full", (yargs) => {
        return yargs
            .positional("projectPath", {
                describe: "path to the project",
                type: "string",
                demandOption: true
            })
            .positional("outputDirectory", {
                describe: "directory to output to",
                type: "string",
                default: "./"
            })
        }, (argv) => {
            if (argv.verbose == undefined) {
                argv.verbose = false
            }
            exportAll(argv.projectPath, argv.outputDirectory, argv.verbose)
        })
    .option("verbose", {
        alias: "v",
        type: "boolean",
        description: "Run with verbose logging"
    })
    .parse()