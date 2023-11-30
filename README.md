# gitano

Utilidad para hacer operaciones rápidas con Git en línea de comandos. 

# Índice

- [gitano](#gitano)
- [Índice](#índice)
- [Instalación](#instalación)
- [Uso](#uso)

# Instalación

```sh
npm install --global @allnulled/gitano
```

Puedes encontrar la documentación en:

  - [https://github.com/allnulled/gitano-bin](https://github.com/allnulled/gitano-bin)
  - [https://www.npmjs.com/package/@allnulled/gitano](https://www.npmjs.com/package/@allnulled/gitano)

# Uso

Primero, emplazar el directorio actual al `.git` del proyecto. Luego:

----

Para hacer un **push**:

```sh
gitano push mensaje de commit opcional
```

El comando `push` consiste en:

```js
const comando_push = function(mensaje) {
    const child_process = require("child_process");
    child_process.execSync("git add .", cmd_options);
    child_process.execSync("git commit -m " + JSON.stringify(mensaje), cmd_options);
    child_process.execSync("git push", cmd_options);
};
```

----

Para hacer un **versionate**:

```sh
gitano versionate mensaje de commit opcional
```

El comando `versionate` consiste en:

```js
const comando_versionate = function(mensaje) {
    const child_process = require("child_process");
    const path = require("path");
    const fs = require("fs");
    child_process.execSync("git add .", cmd_options);
    child_process.execSync("git commit -m " + JSON.stringify(mensaje), cmd_options);
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
    child_process.execSync("git commit -m " + JSON.stringify("v" + version), cmd_options);
    child_process.execSync("git push", cmd_options);
    child_process.execSync("npm publish", cmd_options);
};
```
