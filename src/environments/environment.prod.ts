import { common } from './common';

const production = {
  production: true,
  apiUrl: 'https://api.sintonizateconlavida.com'
};

export const environment = Object.assign(common, production);
