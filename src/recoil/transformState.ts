import { atom } from 'recoil';

export const transformState = atom({
  key: 'transformState',
  default: {
    fromFramework: '',
    fromVersion: '',
    toFramework: '',
    toVersion: '',
  },
});
