import axios, { AxiosResponse } from 'axios';
import { SelectedOptions, TransformRequestBody, TransformedCode } from '@api/Transform.interface';
import { UploadedImage } from '@api/Upload.interface';

export const transformRequest = async (
  selectedOptions: SelectedOptions[],
  uploadedImages: UploadedImage[],
): Promise<TransformedCode[]> => {
  const requests: Promise<AxiosResponse<TransformedCode>>[] = [];

  for (const img of uploadedImages) {
    const sel = selectedOptions.find((s) => s.id === img.id);
    if (!sel) {
      console.warn(`No selected option found for uploaded image id: ${img.id}`);
      continue;
    }

    const body: TransformRequestBody = {
      id: img.id,
      from: { name: sel.from[0], version: sel.from[1] },
      to: { name: sel.to[0], version: sel.to[1] },
    };

    requests.push(
      axios.post<TransformedCode>('https://0fb79663-e403-48e7-bdd7-c4473a350021.mock.pstmn.io/transform/', body, {
        headers: {
          'Content-Type': 'application/json',
          'x-mock-response-delay': '2000',
        },
        maxBodyLength: Infinity,
      }),
    );
  }

  try {
    const responses = await Promise.all(requests);
    return responses.map((res: AxiosResponse<TransformedCode>) => res.data);
  } catch (error) {
    console.error('Transform API 요청 중 오류 발생', error);
    throw error;
  }
};
