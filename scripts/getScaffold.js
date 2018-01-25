const exec = require("child_process").exec;
const rimraf = require("rimraf");
const chalk = require("chalk");
const fs = require("fs");
const log = console.log;
const argv = require("minimist")(process.argv.slice(2));
const type = argv._[0] || "pc";
let tempDir = "pc-scaffold";
let gitUrl = "https://github.com/cindyrise/pc-scaffold.git";
switch (type) {
  case "pc":
    break;
  case "mobile":
    tempDir = "mobile-scaffold";
    gitUrl = "https://github.com/cindyrise/mobile-scaffold.git";
    break;
  case "apollo":
    tempDir = "apollo-scaffold";
    gitUrl = "https://github.com/cindyrise/apollo-scaffold.git";
    break;
}
log(chalk.white(chalk.underline.bgBlue(`git clone ${tempDir}... `)));
rimraf(`app/templates/${tempDir}`, () => {
  exec(`cd ./app/templates  && git clone ${gitUrl}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("error: " + error);
        return;
      }
      log(chalk.white(chalk.underline.bgBlue(`git clone ${tempDir} 完成 `)));
      exec(` cd ./app/templates/${tempDir} && rm -rf .*`)
    }
  );
});
