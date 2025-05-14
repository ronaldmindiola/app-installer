#!/usr/bin/env node
import { showMenu } from './menu';
showMenu().catch((error) => {
    console.error('❌ Se produjo un error:', error);
});
