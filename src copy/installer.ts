import ora from 'ora';
import { execAsync } from './utils';
import { isAppInstalled } from './services/wingetServices';
import { Package } from './types/appTypes';

export const installPackage = async (app: Package): Promise<void> => {
  try {
    const installed = await isAppInstalled(app.id);

    if (installed) {
      console.log(`✔ ${app.name} ya está instalado.`);
      return;
    }

    const spinner = ora(`Instalando ${app.name}...`).start();
    spinner.color = 'green';

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 10, 100);
      spinner.text = `Instalando ${app.name} (${Math.floor(progress)}%)...`;
    }, 500);

    const { stderr } = await execAsync(`winget install --id=${app.id} -e`);
    clearInterval(progressInterval);
    spinner.succeed(`Instalación de ${app.name} completada.`);

    if (stderr) {
      console.warn(`⚠️ Advertencia durante la instalación de ${app.name}: ${stderr}`);
    }
  } catch (error) {
    console.error(`❌ Error al instalar ${app.name}: ${error.message}`);
  }
};

export const installPackages = async (selectedApps: Package[]): Promise<void> => {
  if (selectedApps.length > 0) {
    console.log('Iniciando instalación de aplicaciones seleccionadas...');
    await Promise.all(selectedApps.map(app => installPackage(app)));
    console.log('Proceso de instalación completado.');
  } else {
    console.log('⚠️ No se seleccionaron aplicaciones para instalar.');
  }
};
