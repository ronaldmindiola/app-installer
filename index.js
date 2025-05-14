import inquirer from "inquirer";
import {
  installPackages,
  uninstallPackages,
  updatePackages,
  help,
  exit,
} from "./installer.js";
import { mainMenu } from "./menu.js";
import chalk from "chalk";
import createSpinner from "./spinner.js";

async function main() {
  console.clear();
  const spinner = createSpinner();
  spinner.start(`${chalk.blue("Loading...")}`, "dots2", ["cyan"]);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula la carga de la app
  spinner.setColor(["yellow"]);
  spinner.stop();
  console.clear();

  while (true) {
    const { action } = await inquirer.prompt(mainMenu);
    switch (action) {
      case "install":
        // Implementar la función para instalar aplicaciones
        await installPackages();
        break;
      case "update":
        // Implementar la función para actualizar aplicaciones
        await updatePackages();
        break;
      case "uninstall":
        await uninstallPackages();
        break;
      case "help":
        // Implementar la función para mostrar ayuda/documentación
        await help();
        break;
      case "exit":
        
        await exit();
        return;
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
