# UnScratch
[![language](https://img.shields.io/badge/language-TypeScript-blue)](https://www.typescriptlang.org/)

UnScratch is a tool that can be used to unpack and "export" sprites, assets, etc. from `.sb3` files, and convert them into readable `.json`, `.png` / `.svg`, or `.mp3` files.

## Description

UnScratch is a tool that can "unpack" `.sb3` files into a project directory containing all the sprite
files, code, assets, and initial variables / lists; making it easier for other projects to read, but also
making it git-friendly as well.

UnScratch should (mostly) work on any TurboWarp and Scratch project, though support for other platforms
like PenguinMod is uncertain. 
Custom extensions ARE detected but are not exported at this time.

This is a new project (as well as my first open-source project), so there's not a lot to be said as of right now.
Soon, I hope that UnScratch will have more features like assigning user-friendly IDs instead of the
randomized (and confusing) IDs that Scratch uses, as well as making certain files (like code files)
easier to digest and read.

## Installation

UnScratch, despite being a Node.js project, is not hosted on `npm` right now. To install:
* Download & install Node.js [from here](https://nodejs.org/) if you don't have it already.
* Download the source code.
* Compile the TypeScript code using `npx tsc`.
  * A new folder named `dist` should be created.
* Run `npm link`.
* Congrats, you can now use UnScratch by calling `unscratch` in your terminal!

Pre-built binaries (and eventually, a release on `npm`) will come in the future.

## Usage

So far, UnScratch only has one command: `export_all`.

Usage:
```
unscratch -h
unscratch export_all /path/to/your/project.sb3
unscratch export_all /path/to/your/project.sb3 -h -v
```

Options:

`-h` Gets information about a command. If no command, fetches information about UnScratch.

`-v` Enables verbose mode.

## Support

If you encounter any issues with UnScratch (which honestly, you probably will), please explain
the issue in full. Specifically, mention:

* The command you ran
* UnScratch's output (in verbose mode)
* Any errors that UnScratch threw
* What the expected result was

## Contributing

This project is open to contributions and actively encourages them as I am a solo dev with not a lot
of time on my hands. If you'd like to contribute, please feel free to do so. When contributing, please do
the following:

* Try to branch off of `dev` for most things.
* Name your branch something clear, like `feature/scratch_assets_rename`. If it's a bugfix, `fix/weird_bug`.
* Format your code with Prettier using the config in the root directory before pushing. (I won't hunt you down for this, but it'd be nice.)
* Please bug-check your code before making a PR.
* PR back into the branch you branched off of. If your PR solves an issue, mention that as well.
