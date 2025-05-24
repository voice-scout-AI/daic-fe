import axios from 'axios';

export const uploadSingleImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post('http://3.37.223.99:8000/upload-image/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.result || '';
};

export const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));

  const response = await axios.post('http://3.37.223.99:8000/upload-multiple-images/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    maxBodyLength: Infinity,
  });

  return response.data?.results || [];
};
