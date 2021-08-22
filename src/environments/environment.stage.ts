import { common } from './common';

const stage = {
  apiUrl: 'http://localhost/api',
  stage: true
};

export const environment = Object.assign(common, stage);
