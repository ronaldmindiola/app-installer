// src/installer.js
import { exec } from 'child_process';
import ora from 'ora';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Definir las categorias
export const categories = {
    "Navegadores": [
        { name: "Arc", id: "TheBrowserCompany.Arc" },
        { name: "Google Chrome", id: "Google.Chrome" },
        { name: "Mozilla Firefox", id: "Mozilla.Firefox" },
        { name: "Brave", id: "Brave.Brave" }
    ],
    "Reader PDF" : [
        { name: "Adobe Acrobat Reader DC (64 bits)", id: "Adobe.Acrobat.Reader.64-bit"},
        { name: "Foxit PDF Reader", id: "Foxit.FoxitReader"}
    ],
    "Herramientas": [
        { name: ".NET Framework Developer Pack", id: "Microsoft.DotNet.Framework.DeveloperPack_4" },
        { name: "Malwarebytes", id: "Malwarebytes.Malwarebytes" },
        { name: "K-Lite Codec Pack", id: "CodecGuide.K-LiteCodecPack.Mega" },
        { name: "7-Zip", id: "7zip.7zip" },
        { name: "Notion", id: "Notion.Notion" },
        { name: "iTunes", id: "Apple.iTunes" },
        { name: "VLC", id: "VideoLAN.VLC" },
        { name: "Kodi", id: "XBMCFoundation.Kodi" },
        { name: "JDownloader 2", id: "AppWork.JDownloader" },
        { name: "AnyDesk", id: "AnyDeskSoftwareGmbH.AnyDesk" },

    ],
    "Clouds" : [
        {
            name: "Dropbox",
            id: "Dropbox.Dropbox"
        },
        {
            name: "Google Drive",
            id: "Google.GoogleDrive"
        },
        {
            name: "OneDrive",
            id: "Microsoft.OneDrive"
        },
        {
            name: "Box One",
            id: "Box.BoxOne"
        }
    ],
    "Antivirus": [
        {
            name: "Avast Free",
            id: "AvastSoftware.Avast"
        },
        {
            name: "Bitdefender",
            id: "Bitdefender.Bitdefender"
        }
    ],
    "Development" : [
        { name: "Postman", id: "Postman.Postman" },
        {
            name: "Visual Studio Code",
            id: "Microsoft.VisualStudioCode"
        },
        
        {
            name: "GitHub Desktop",
            id: "GitHub.GitHubDesktop"
        },
        {
            name: "Node.js LTS",
            id: "nodejs.Nodejs"
        },
        {
            name: "Git",
            id: "Git.Git"
        },
        {
            name: "Node.js",
            id: "nodejs.Nodejs"
        }

    ]
};

// Generar una lista de aplicaciones desde las categorías
export const packages = Object.fromEntries(
    Object.values(categories).flat().map(app => [app.name, app.id])
);

// Definir las aplicaciones disponibles
/* export const packages = {
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
}; */

// Función para verificar si una aplicación está instalada
export const isAppInstalled = async (packageId) => {
    try {
        const { stdout } = await execAsync(`winget list --id ${packageId}`);
        // Devuelve true si se encuentra el packageId en la salida
        return stdout.includes(packageId);
    } catch ({ message }) {
        // Solo registra el error y retorna false
        //console.error(`❌ Error al verificar la instalación de ${packageId}: ${message}`);
        return false;
    }
};



// Función para instalar una aplicación individual
const installPackage = async (app, packageId) => {
    try {
        // Verificar si la aplicación ya está instalada antes de mostrar el mensaje de instalación
        const installed = await isAppInstalled(packageId);

        if (installed) {
            console.log(`✔ ${app} ya está instalado.`);
            return;
        }

        // Solo mostrar el spinner si la instalación procede
        const spinner = ora(`Instalando ${app}...`).start();
        spinner.color = 'green';

        let isInstalling = true;
        const toggleMessage = () => {
            if (isInstalling) {
                spinner.text = `Instalando ${app}...`;
                spinner.color = 'green';
            } else {
                spinner.text = 'Por favor espere...';
                spinner.color = 'yellow';
            }
            isInstalling = !isInstalling;
        };

        setTimeout(() => {
            spinner.color = 'yellow';
        }, 1000);

        const { stdout, stderr } = await execAsync(`winget install --id=${packageId} -e`);
        spinner.succeed(`✔️ Instalación de ${app} completada.`);

        if (stderr) {
            console.warn(`⚠️ Advertencia durante la instalación de ${app}: ${stderr}`);
        }

    } catch (error) {
        console.error(`❌ Error al instalar ${app}: ${error.message}`);
    }
};



// Función principal para instalar las aplicaciones seleccionadas
export const installPackages = async (selectedApps) => {
    if (selectedApps.length > 0) {
        console.log('Iniciando instalación de aplicaciones seleccionadas...');
        for (const app of selectedApps) {
            await Promise.all(selectedApps.map(app => installPackage(app, packages[app]))); 
        }
        console.log('Proceso de instalación completado.');
    } else {
        console.log('⚠️ No se seleccionaron aplicaciones para instalar.');
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
