// src/types/appTypes.ts

export type Action = 'installApps' | 'clearScreen' | 'exit';

export interface AppChoice {
    name: string;
    value: string;
}

export interface Package {
  name: string;
  id: string;
}

export interface Category {
  [key: string]: Package[];
}

export enum MenuActions {
  InstallApps = 'installApps',
  ClearScreen = 'clearScreen',
  Exit = 'exit'
}
