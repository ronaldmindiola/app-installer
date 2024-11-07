// src/menu.jsimport inquirer from "inquirer";
import ora from "ora";
import colors from "yoctocolors";
import { installPackages, packages } from "./installer.js";
import { clearScreen, promptForRestart  } from "./utils/utils.js";
import { createSpinner } from "./utils/spinner.js";
import inquirer from "inquirer";

const mainMenu = [
  {
    type: "list",
    name: "action",
    message: `${colors.green("What action would you like to perform?")}`,
    choices: [
      { name: colors.blue("Install Apps"), value: "installApps" },
      { name: colors.gray("Clear Screen"), value: "clearScreen" },
      { name: colors.red("Exit"), value: "exit" },
    ],
  },
];

export const main = async () => {
  let exitProgram = false;

  while (!exitProgram) {
    console.clear(); // Limpia la consola al mostrar el menú principal
    const { action } = await inquirer.prompt(mainMenu);

    switch (action) {
      case "installApps":
        
        const { selectedApps } = await inquirer.prompt({
          type: "checkbox",
          name: "selectedApps",
          message: `${colors.green(
            "What applications would you like to install?"
          )}\n ${colors.gray(
            "Use the arrow keys to navigate and enter to select"
          )}\n`,
          choices: Object.keys(packages),
        });
        createSpinner('Instalando aplicaciones...');
        await installPackages(selectedApps);
        createSpinner('Verificando versiones...');
        // await checkVersions();
        break;
      case "clearScreen":
        clearScreen();
        break;
      case "exit":
        const spinner = ora("Closing the program...").start();
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un proceso de cierre
        spinner.succeed(
          `Thank you for using the installer. ${colors.magenta("¡Goodbye!")}`
        );
        exitProgram = true;
        break;
    }

    if (!exitProgram && !(await promptForRestart())) {
      exitProgram = true;
      console.log("Gracias por usar el instalador.");
    }
  }
};
