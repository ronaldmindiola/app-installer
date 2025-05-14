import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { Category } from '../types/appTypes';

export const execAsync = promisify(exec);

export const clearScreen = (): void => {
  console.clear();
};

export const loadCategories = async (): Promise<Category> => {
  const filePath = path.join(__dirname, '../data/categories.json');
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
};
