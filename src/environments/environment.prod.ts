import { common } from './common';

const production = {
  production: true,
  apiUrl: 'http://localhost/api'
};

export const environment = Object.assign(common, production);
