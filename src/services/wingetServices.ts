// src/services/wingetService.ts

import ora from 'ora';
import { AppChoice } from '../types/appTypes';

const availableApps: AppChoice[] = [
    { name: 'App1', value: 'app1' },
    { name: 'App2', value: 'app2' },
    { name: 'App3', value: 'app3' }
];

export const getAvailableApps = () => availableApps;

export const installApps = async (selectedApps: string[]) => {
    const spinner = ora('Instalando aplicaciones...').start();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula el tiempo de instalación
    spinner.succeed(`Aplicaciones instaladas: ${selectedApps.join(', ')}`);
};