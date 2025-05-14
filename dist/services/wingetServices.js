// src/services/wingetService.ts
import ora from 'ora';
const availableApps = [
    { name: 'App1', value: 'app1' },
    { name: 'App2', value: 'app2' },
    { name: 'App3', value: 'app3' }
];
export const getAvailableApps = () => availableApps;
export const installApps = async (selectedApps) => {
    const spinner = ora('Instalando aplicaciones...').start();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula el tiempo de instalación
    spinner.succeed(`Aplicaciones instaladas: ${selectedApps.join(', ')}`);
};
