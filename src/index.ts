#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";

import fs from "fs";

const prompt = require("prompt-sync")();

let Git = require("nodegit");

interface InitOptions {
  store_theme: boolean;
  store_theme_react: boolean;
}

/*console.log(
  chalk.hex("#6621ca")(figlet.textSync("Avanti", { font: "Star Wars" }))
);*/

program
  .name("avtcli")
  .version("1.0.0")
  .description("CLI for speeding up the bootstrap of Vtex IO projects.");

program
  .command("init")
  .description("Command for initializing a project.")
  .option(
    "-st, --store_theme",
    "Creates a simple project with only the default store-theme."
  )
  .option(
    "-str, --store_theme_react",
    "Creates a default store-theme along with a react app."
  )
  .action((args: InitOptions) => {
    if (Object.keys(args).length === 0) {
      console.log(
        chalk.bold.red(
          "You must use either the -st or -str flag, to know more use the --help flag."
        )
      );
    }

    const { store_theme, store_theme_react } = <InitOptions>args;

    if (store_theme) {
      console.log("......CREATING STORE THEME.......");

      let storeName = prompt(
        "What's the name of the store ?(Will be used for naming the directories)"
      );

      let vendor = prompt("What's the vendor to be used in the store?");

      let isRelease = prompt("Wants to release it right away?");

      console.log(storeName);
      console.log(vendor);
      console.log(isRelease);

      const clonePath = `${process.cwd()}/${storeName}`;

      const manifestPath = `${clonePath}/manifest.json`

      Git.Clone(
        "https://github.com/RodrigoContiRibeiro/rodrigos-theme",
        clonePath
      ).then(() => {
        fs.readFile(manifestPath, "utf-8", (err, data) => {
          if (err) {
            return console.log(err);
          }

          let addedStoreName = data.replace("{$(storeName)$}", `${storeName}`);

          let addedVendor = addedStoreName.replace("{$(vendor)$}", `${vendor}`);

          fs.writeFile(manifestPath, addedVendor, "utf-8", (err) => {
            if (err) {
              return console.log(err);
            }
          });
        });
      });
    }
    if (store_theme_react) {
      console.log("......CREATING STORE THEME W/ REACT APP.......");
    }
  });

program.parse(process.argv);
