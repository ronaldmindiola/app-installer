import { exec } from 'child_process';
import inquirer from 'inquirer';
import ora from 'ora';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Definir las aplicaciones disponibles
const packages = {
    //Adobe Acrobat Reader
    //Powertoys
    // Java Runtime Environment
    //.NET Framework Developer Pack
    // 7-Zip
    // Postman
    "Google Chrome": "Google.Chrome",
    "Mozilla Firefox": "Mozilla.Firefox",
    "Notion": "Notion.Notion",
    "AnyDesk": "AnyDeskSoftwareGmbH.AnyDesk",
    "iTunes": "Apple.iTunes",
    "K-Lite Codec Pack": "CodecGuide.K-LiteCodecPack.Mega",
    "VLC": "VideoLAN.VLC",
    ".NET Framework Developer Pack": "Microsoft.DotNet.Framework.DeveloperPack_4",
    "7-Zip": "7zip.7zip",
    "Postman": "Postman.Postman",
    
};

// Función para verificar si una aplicación está instalada
const isAppInstalled = async (packageId) => {
    try {

        const { stdout } = await execAsync(`winget list --id ${packageId}`);
        return stdout.includes(packageId);
    } catch (error) {
        console.error(`❌ Error al verificar la instalación de ${packageId}: ${error.message}`);
        return false;

    }
};

// Función para instalar una aplicación individual
const installPackage = async (app, packageId) => {
    const spinner = ora(`Instalando ${app}...`).start();

    // Verificar si la aplicación ya está instalada
    if (await isAppInstalled(packageId)) {
        spinner.succeed(`${app} ya está instalado.`);
        return;
    }

    try {
        const { stdout, stderr } = await execAsync(`winget install --id=${packageId} -e`);
        spinner.succeed(`✔️ Instalación de ${app} completada.`);
        if (stderr) console.warn(`⚠️ Advertencia durante la instalación de ${app}: ${stderr}`);
    } catch (error) {
        spinner.fail(`❌ Error al instalar ${app}`);
        console.error(`Detalles del error:`);
        console.error(`Mensaje: ${error.message}`);
        console.error(`Salida de error: ${error.stderr}`);
        console.error(`Código de salida: ${error.code}`);
    }
};

// Función principal para instalar las aplicaciones seleccionadas
export const installPackages = async () => {
    const questions = [
        {
            type: 'checkbox',
            name: 'selectedApps',
            message: 'Selecciona las aplicaciones a instalar:',
            choices: Object.keys(packages)
        }
    ];

    try {
        const { selectedApps } = await inquirer.prompt(questions);
        if (selectedApps.length > 0) {
            console.log('Iniciando instalación de aplicaciones seleccionadas...');
            for (const app of selectedApps) {
                await installPackage(app, packages[app]);
            }
            console.log('Proceso de instalación completado.');
        } else {
            console.log('⚠️ No se seleccionaron aplicaciones para instalar.');
        }
    } catch (error) {
        console.error('❌ Ocurrió un error durante el proceso de selección o instalación:', error);
    }
};

// Función para verificar las versiones de las aplicaciones instaladas
export const checkVersions = async () => {
    console.log('Verificando versiones de las aplicaciones instaladas...');
    for (const [app, packageId] of Object.entries(packages)) {
        const spinner = ora(`Verificando ${app}...`).start();
        try {
            const { stdout } = await execAsync(`winget list --id ${packageId}`);
            if (stdout.includes(packageId)) {
                spinner.succeed(`${app} está instalado.`);
            } else {
                spinner.info(`⚠️ ${app} no está instalado.`);
            }
        } catch (error) {
            spinner.fail(`❌ No se pudo verificar ${app}`);
            console.error(`Detalles del error: ${error.message}`);
        }
    }
};

// Si se ejecuta este archivo directamente
 if (import.meta.url === `file://${process.argv[1]}`) {
    installPackages().catch(console.error);
}
