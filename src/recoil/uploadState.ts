import { FromOptions, ToOptions, UploadedImage } from '@api/UploadProc.interface';
import { atom } from 'recoil';

export const fromOptionsState = atom<FromOptions[]>({
  key: 'fromOptionsState',
  default: [],
});

export const toOptionsState = atom<ToOptions[]>({
  key: 'toOptionsState',
  default: [],
});

export const uploadedImageState = atom<UploadedImage[]>({
  key: 'uploadedImageState',
  default: [],
});
