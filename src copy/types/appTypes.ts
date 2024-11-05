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
