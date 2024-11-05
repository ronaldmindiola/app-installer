#!/usr/bin/env node
import { showMenu } from './menu';

showMenu().catch((error: any) => {
  console.error('❌ Se produjo un error:', error);
});

