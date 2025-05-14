// installer.js
import { exec } from "child_process";
import inquirer from "inquirer";
import { promisify } from "util";
import { questionsInstall, questionsUninstall } from "./menu.js";
import { packages } from "./appList.js";
import createSpinner from "./spinner.js";
import chalk from "chalk";
import consola from "consola";

const execAsync = promisify(exec);

// Función principal para seleccionar e instalar aplicaciones
export const installPackages = async () => {
  const spinner = createSpinner();
  try {
    console.clear();
    const { selectedApps } = await inquirer.prompt(questionsInstall);

    if (selectedApps.length === 0) {
      // Muestra advertencia si no se seleccionan apps
      consola.warn("No se seleccionaron aplicaciones para instalar.");

      return; // Sale si elige no volver al menú
    }

    for (const appName of selectedApps) {
      const packageId = packages[appName];

      if (packageId) {
        spinner.start(`Instalando ${chalk.bold(`${appName}`)}...`);

        if (await isAppInstalled(packageId)) {
          spinner.succeed(`${chalk.bold(`${appName}`)} ya esta instalado.`);
        } else {
          await executeInstallCommand(appName, packageId);
        }
      } else {
        consola.warn(`⚠️ ${appName} no tiene un ID de instalación.`);
      }
    }
  } catch (error) {
    spinner.fail("❌ Error en el proceso de instalación");
    console.error("Detalles del error:", error.message);
  }
};

// Función principal para seleccionar y desinstalar aplicaciones
export const uninstallPackages = async () => {
  try {
    const { selectedApps } = await inquirer.prompt(questionsUninstall);

    if (selectedApps.length === 0) {
      console.log("⚠️ No se seleccionaron aplicaciones para desinstalar.");
      return;
    }

    for (const appName of selectedApps) {
      const packageId = packages[appName];
      if (packageId) {
        // Verificar si la aplicación está instalada antes de intentar desinstalarla
        if (await isAppInstalled(packageId)) {
          await executeUninstallCommand(appName, packageId);
        } else {
          console.log(`⚠️ ${appName} no está instalado.`);
        }
      } else {
        console.warn(`⚠️ ${appName} no tiene un ID de desinstalación.`);
      }
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

export const updatePackages = async () => {
  console.log("update");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.clear();
  return;
};

export const help = async () => {
  console.log("help");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return;
};

export const exit = async () => {
  const spinner = createSpinner();
  spinner.start("Closing...");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un proceso de cierre
  spinner.succeed("See you later!");
};

// Verificar si la app ya está instalada
const isAppInstalled = async (appName, packageId) => {
  console.log("verficar app");
  console.log(appName, packageId);

  const spinner = createSpinner();
  try {
    spinner.start(`Checking ${appName}...`);
    const { stdout } = await execAsync(`winget list --id ${packageId}`);
    spinner.stop();
    return stdout.includes(packageId);
  } catch (error) {
    spinner.fail(`Error al verificar ${packageId}: ${error.message}`);
    console.clear();
    return false;
  }
};

// Función para ejecutar comandos
const executeInstallCommand = async (appName, packageId) => {
  const spinner = createSpinner();
  spinner.start(`Instalando ${appName}...`);
  spinner.setColor(["yellow"]);

  try {
    const { stdout, stderr } = await execAsync(
      `winget install --id=${packageId} -e`
    );
    spinner.succeed(`${appName} instalado con éxito.`);
    if (stderr)
      console.warn(
        `⚠️ Advertencia durante la instalación de ${appName}: ${stderr}`
      );
  } catch (error) {
    spinner.fail(`❌ Error en la instalación de ${appName}`);
    console.error(`Detalles del error:`, error.message);
  }
};

// Función para ejecutar comandos de desinstalación
const executeUninstallCommand = async (appName, packageId) => {
  const spinner = createSpinner({
    text: `Desinstalando ${appName}...`,
    spinnerType: "dots",
  }).start();

  try {
    const { stdout, stderr } = await execAsync(
      `winget uninstall --id=${packageId} -e`
    );
    spinner.succeed(`${appName} desinstalado con éxito.`);
    if (stderr)
      console.warn(
        `⚠️ Advertencia durante la desinstalación de ${appName}: ${stderr}`
      );
  } catch (error) {
    spinner.fail(`❌ Error en la desinstalación de ${appName}`);
    console.error(`Detalles del error:`, error.message);
  }
};

// Instalar una aplicación
/* const installPackage = async (appName, packageId) => {
    
    if (await isAppInstalled(packageId)) {
        console.log(`✅ ${appName} ya está instalado.`);
        return;
    }
    await executeCommand(`winget install --id=${packageId} -e`, appName);
}; */

// Función principal para seleccionar e instalar apps
/* export const installPackages = async () => {
    try {
        const { selectedApps } = await inquirer.prompt(questionsMenu);

        if (selectedApps.length === 0) {
            console.log('⚠️ No se seleccionaron aplicaciones para instalar.');
            return;
        }

        for (const appName of selectedApps) {
            const packageId = packages[appName];
            if (packageId) 
                await installPackage(appName, packageId);
            else 
            console.warn(`⚠️ ${appName} no tiene un ID de instalación.`);
        }

        console.log('Proceso de instalación completado.');
    } catch (error) {
        console.error('❌ Error en el proceso:', error.message);
    }
}; */

// Verificar versiones instaladas
/* export const checkVersions = async () => {
    console.log('Verificando versiones...');
    for (const [appName, packageId] of Object.entries(packages)) {
        const spinner = ora(`Verificando ${appName}...`).start();
        try {
            const { stdout } = await execAsync(`winget list --id ${packageId}`);
            if (stdout.includes(packageId)) spinner.succeed(`${appName} está instalado.`);
            else spinner.warn(`${appName} no está instalado.`);
        } catch (error) {
            spinner.fail(`Error verificando ${appName}`);
        }
    }
}; */

// Ejecución directa
if (import.meta.url === `file://${process.argv[1]}`) {
  installPackages().catch(console.error);
  uninstallPackages().catch(console.error);
}
