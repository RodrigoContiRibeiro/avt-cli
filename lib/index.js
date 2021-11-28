#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var fs_1 = __importDefault(require("fs"));
var prompt = require("prompt-sync")();
var Git = require("nodegit");
/*console.log(
  chalk.hex("#6621ca")(figlet.textSync("Avanti", { font: "Star Wars" }))
);*/
commander_1.program
    .name("avtcli")
    .version("1.0.0")
    .description("CLI for speeding up the bootstrap of Vtex IO projects.");
commander_1.program
    .command("init")
    .description("Command for initializing a project.")
    .option("-st, --store_theme", "Creates a simple project with only the default store-theme.")
    .option("-str, --store_theme_react", "Creates a default store-theme along with a react app.")
    .action(function (args) {
    if (Object.keys(args).length === 0) {
        console.log(chalk_1.default.bold.red("You must use either the -st or -str flag, to know more use the --help flag."));
    }
    var _a = args, store_theme = _a.store_theme, store_theme_react = _a.store_theme_react;
    if (store_theme) {
        console.log("......CREATING STORE THEME.......");
        var storeName_1 = prompt("What's the name of the store ?(Will be used for naming the directories)");
        var vendor_1 = prompt("What's the vendor to be used in the store?");
        var isRelease = prompt("Wants to release it right away?");
        console.log(storeName_1);
        console.log(vendor_1);
        console.log(isRelease);
        var clonePath = "".concat(process.cwd(), "/").concat(storeName_1);
        var manifestPath_1 = "".concat(clonePath, "/manifest.json");
        Git.Clone("https://github.com/RodrigoContiRibeiro/rodrigos-theme", clonePath).then(function () {
            fs_1.default.readFile(manifestPath_1, "utf-8", function (err, data) {
                if (err) {
                    return console.log(err);
                }
                var addedStoreName = data.replace("{$(storeName)$}", "".concat(storeName_1));
                var addedVendor = addedStoreName.replace("{$(vendor)$}", "".concat(vendor_1));
                fs_1.default.writeFile(manifestPath_1, addedVendor, "utf-8", function (err) {
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
commander_1.program.parse(process.argv);
