import { common } from './common';

const stage = {
  apiUrl: 'https://entiven.com/api',
  stage: true
};

export const environment = Object.assign(common, stage);
