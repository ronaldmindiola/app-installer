import inquirer from 'inquirer';
import ora from 'ora';
import { installPackages } from './installer.js'; // Añade las nuevas funciones si es necesario

const mainMenu = [
  {
    type: 'list',
    name: 'action',
    message: '¿Qué acción deseas realizar?',
    choices: [
      'Instalar aplicaciones',
      'Actualizar aplicaciones',
      'Desinstalar aplicaciones',
      'Ver estado de instalación',
      'Exportar configuración',
      'Importar configuración',
      'Mostrar ayuda',
      'Salir'
    ]
  }
];

async function main() {
  while (true) {
    const { action } = await inquirer.prompt(mainMenu);

    switch (action) {
      case 'Instalar aplicaciones':
        await installPackages();
        break;
      case 'Actualizar aplicaciones':
        // Implementar la función para actualizar aplicaciones
        break;
      case 'Desinstalar aplicaciones':
        // Implementar la función para desinstalar aplicaciones
        break;
      case 'Ver estado de instalación':
        // Implementar la función para mostrar el estado de instalación
        break;
      case 'Exportar configuración':
        // Implementar la función para exportar configuración
        break;
      case 'Importar configuración':
        // Implementar la función para importar configuración
        break;
      case 'Mostrar ayuda':
        // Implementar la función para mostrar ayuda/documentación
        break;
      case 'Salir':
        const spinner = ora('Cerrando el programa...').start();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un proceso de cierre
        spinner.succeed('✔️ Gracias por usar el instalador. ¡Hasta luego!');
        return;
    }
  }
}

main().catch(error => {
  console.error('❌ Se produjo un error:', error);
});
