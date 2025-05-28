import axios from 'axios';
import { UploadImageResponse } from './Upload.interface';

export const uploadImages = async (files: File[]): Promise<UploadImageResponse> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await axios.post<UploadImageResponse>(
    'https://0fb79663-e403-48e7-bdd7-c4473a350021.mock.pstmn.io/upload-images/',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
