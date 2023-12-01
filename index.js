#!/usr/bin/env node

const [bin_node, bin_gitano, comando, ...argumentos] = process.argv;

console.log("[*] Using «gitano» powerful command line utility [*]");
console.log("[*] Gitano path: " + bin_gitano);
console.log("[*] Node path: " + bin_node);
console.log("[*] Gitano command: " + comando);
console.log("[*] Current directory:  " + process.cwd());

const cmd_options = {
    stdio: [process.stdin, process.stdout, process.stderr],
    cwd: process.cwd()
};
const comando_push = function(mensaje) {
    const child_process = require("child_process");
    child_process.execSync("git add .", cmd_options);
    child_process.execSync("git commit -m " + JSON.stringify(mensaje) + " || echo no_commit", cmd_options);
    child_process.execSync("git push", cmd_options);
};
const comando_versionate = function(mensaje) {
    const child_process = require("child_process");
    const path = require("path");
    const fs = require("fs");
    child_process.execSync("git add .", cmd_options);
    child_process.execSync("git commit -m " + JSON.stringify(mensaje) + " || echo no_commit", cmd_options);
    child_process.execSync("git push", cmd_options);
    child_process.execSync("npm version patch", cmd_options);
    const package_path = path.resolve(process.cwd(), "package.json");
    const package_data = require(package_path);
    if(!package_data.uuid_commit) {
        package_data.uuid_commit = 0;
    }
    package_data.uuid_commit++;
    fs.writeFileSync(package_path, JSON.stringify(package_data, null, 4), "utf8");
    const version = package_data.version;
    child_process.execSync("git add .", cmd_options);
    child_process.execSync("git commit -m " + JSON.stringify("v" + version) + " || echo no_commit", cmd_options);
    child_process.execSync("git push", cmd_options);
    child_process.execSync("npm publish", cmd_options);
};

if(typeof comando === "undefined") {
    throw new Error("Required parameter «command» in order to execute «gitano»");
}
let mensaje = "";
for(let index=0; index<argumentos.length; index++) {
  const argumento = argumentos[index];
  mensaje += argumento;
  mensaje += " ";
}
mensaje = mensaje.trim();
if(mensaje === "") {
    mensaje = "default commit message";
}
if(comando === "push") {
    comando_push(mensaje);
} else if(comando === "versionate") {
    comando_versionate(mensaje);
} else {
    throw new Error("Required parameter «command» to be valid («push» or «versionate») in order to execute «gitano»");
}