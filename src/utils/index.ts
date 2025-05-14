import colors from 'yoctocolors';

export const clearScreen = () => {
    console.clear();
    console.log(colors.gray('Pantalla limpiada.'));
};

export const exitMessage = () => {
    console.log(colors.magenta('¡Hasta luego!'));
};

/* 
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { Category } from '../types/appTypes';

export const execAsync = promisify(exec);

export const clearScreen = (): void => {
  console.clear();
};

export const loadApps = async (): Promise<Category> => {
  const filePath = path.join(__dirname, '../data/apps.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const loadCategories = async (): Promise<Category> => {
  const filePath = path.join(__dirname, '../data/categories.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const loadPackages = async (): Promise<Category> => {
  const filePath = path.join(__dirname, '../data/packages.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};

export const isAppInstalled = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    exec(`winget list --id ${id} --exact`, (err, stdout) => {
      resolve(stdout.includes(id));
    });
  });
};

 */