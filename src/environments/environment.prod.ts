import { common } from './common';

const production = {
  production: true,
  apiUrl: 'https://entiven.com/api'
};

export const environment = Object.assign(common, production);
