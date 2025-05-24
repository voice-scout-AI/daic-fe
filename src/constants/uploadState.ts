import { atom } from 'recoil';

export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
}

export interface OcrData {
  // 백에서 받아올거
  id: string;
  text: string;
  fromFramework: string;
  fromVersion: string;
}

export const uploadedImageState = atom<UploadedImage[]>({
  key: 'uploadedImageState',
  default: [],
});

export const ocrDataState = atom<OcrData[]>({
  key: 'ocrDataState',
  default: [],
});
