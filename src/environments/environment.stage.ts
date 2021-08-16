import { common } from './common';

const stage = {
  apiUrl: 'https://stagegastropack.hmsistemas.net',
  stage: true
};

export const environment = Object.assign(common, stage);
