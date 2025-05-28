import { atom } from 'recoil';
import { FromOptions, ToOptions, UploadedImage } from '@api/Upload.interface';

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
