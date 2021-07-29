// CSS Import
import './css/style.css';
import './css/font.css';
import './css/animation.css';
import './css/button.css';

// JS Import
import './app';

import { perspective_3d } from './app';
import { import_js_as_module } from './utils';

window.onload = start;

async function start()
{
    await import_js_as_module('/fluid.js');
    perspective_3d('perspective');
}