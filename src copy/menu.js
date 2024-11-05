// src/menu.js
import inquirer from 'inquirer';
import ora from 'ora';
import colors from 'yoctocolors';
import { installPackages, packages } from './installer.js';
import { clearScreen } from './utils.js';



const mainMenu = [
    {
        type: 'list',
        name: 'action',
        message: `${colors.green('¿Qué acción deseas realizar?')}`,
        choices: [
            { name: colors.blue('Instalar aplicaciones'), value: 'installApps' },
            { name: colors.gray('Limpiar pantalla'), value: 'clearScreen' },
            { name: colors.red('Salir'), value: 'exit' }
        ]
    }
];

export const main = async () => {
    while (true) {
        const { action } = await inquirer.prompt(mainMenu);

        switch (action) {
            case 'installApps':
                const { selectedApps } = await inquirer.prompt({
                    type: 'checkbox',
                    name: 'selectedApps',
                    message: 'Selecciona las aplicaciones a instalar:',
                    choices: Object.keys(packages)
                });
                await installPackages(selectedApps);
                break;
            case 'clearScreen':
                clearScreen();
                break;
            case 'exit':
                const spinner = ora('Cerrando el programa...').start();
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un proceso de cierre
                spinner.succeed(`Gracias por usar el instalador. ${colors.magenta('¡Hasta luego!')}`);
                spinner.warn('ROLD')
                return;
        }
    }
};
