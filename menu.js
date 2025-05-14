import chalk from "chalk";
import { packages } from "./appList.js";

export const mainMenu = [
  {
    type: "list",
    name: "action",
    message: "What action would you like to perform?",
    choices: [
      { name: "Install Apps", value: "install" },
      { name: "Update Apps", value: "update" },
      { name: "Uninstall Apps", value: "uninstall" },
      { name: "Mostrar ayuda", value: "help" },
      { name: chalk.red("Exit"), value: "exit" },
    ],
  },
];

export const questionsInstall = [
  {
    type: "checkbox",
    name: "selectedApps",
    message: "Selecciona las aplicaciones a instalar:",
    choices: Object.keys(packages),
  },
];

export const questionsUninstall = [
  {
    type: "checkbox",
    name: "selectedApps",
    message: "Selecciona las aplicaciones a desinstalar:",
    choices: Object.keys(packages),
  },
];
