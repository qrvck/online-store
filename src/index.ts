import './scss/styles.scss';

import assortment from './assets/assortment.json';
import App from './ts/app';

const app = new App(assortment);
app.start();
