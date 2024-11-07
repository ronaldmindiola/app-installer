// src/utils.js
import { exec } from 'child_process';
import inquirer from 'inquirer';

// Función para limpiar la pantalla
const clearScreen = () => {
    console.clear();
};

// Función para preguntar si desea realizar otra operación
const promptForRestart = async () => { 
    const { restart } = await inquirer.prompt({ 
        type: 'confirm', 
        name: 'restart', 
        message: '¿Quieres realizar otra operación?', 
        default: true 
    });
    return restart;
};

export {
    clearScreen,
    promptForRestart
}