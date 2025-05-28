import { atom } from 'recoil';
import { SelectedOptions, TransformedCode } from '@api/Transform.interface';

export const selectState = atom<SelectedOptions[]>({
  key: 'selectState',
  default: [],
});

export const transformState = atom<TransformedCode[]>({
  key: 'transformState',
  default: [],
});
