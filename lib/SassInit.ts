import path from "path";
import fs from "fs";

import sass from "node-sass";
import logger from "./logger";


const SCSS_DEFAULT_PATH = path.join(__dirname, "..", "scss");
const CSS_DEFAULT_OUTPUT_PATH = path.join(__dirname, "..", "static");

export default function sassInit() {
  sassExec("style");
  sassExec("login_style");
  sassExec("register_style");
  sassExec("input_restaurant_style");
}

function sassExec(filename: string) {
  let inputDir = path.join(SCSS_DEFAULT_PATH, filename + ".scss");
  let outputDir = path.join(CSS_DEFAULT_OUTPUT_PATH, filename + ".css");

  let data = sass.renderSync({
    file: inputDir,
    outputStyle: "compressed",
  });

  fs.writeFileSync(outputDir, data.css);

  logger.info(`SASS Convert ${inputDir} -> ${outputDir}`);
}