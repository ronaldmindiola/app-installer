// src/utils.js
import { exec } from 'child_process';

// Función para limpiar la pantalla
export const clearScreen = () => {
    const isWindows = process.platform === 'win32';
    exec(isWindows ? 'cls' : 'clear', (err) => {
        if (err) {
            console.error('Error al limpiar la pantalla:', err);
        }
    });
};
