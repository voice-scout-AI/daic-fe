import { useEffect, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { uploadSingleImage, uploadMultipleImages } from '@api/upload';

import { uploadedImageState, UploadedImage, ocrDataState } from '@constants/uploadState';
import { stepState } from '@constants/stepState';
import StepIndicator from '@components/StepIndicator';
import ImageThumbnail from '@components/ImageThumbnail';
import { Icon } from '@iconify/react';

const UploadProc = () => {
  const [images, setImages] = useRecoilState(uploadedImageState);
  const setOcrData = useSetRecoilState(ocrDataState);
  const [, setStep] = useRecoilState(stepState);
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStep(1); // Upload 단계 진입 시 stepState를 1로 설정
  }, [setStep]);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));

    const newImages: UploadedImage[] = validFiles.map((file) => ({
      id: uuidv4(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    try {
      let ocrResults: string[] = [];

      if (validFiles.length === 1) {
        const result = await uploadSingleImage(validFiles[0]);
        ocrResults = [result];
      } else {
        ocrResults = await uploadMultipleImages(validFiles);
      }

      setOcrData((prev) => [
        ...prev,
        ...newImages.map((img, i) => ({
          id: img.id,
          text: ocrResults[i] || '',
          fromFramework: '',
          fromVersion: '',
        })),
      ]);
    } catch (err) {}
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-10 pb-24 bg-black">
      <StepIndicator />

      <div className="w-full px-6 py-8 bg-white shadow-md rounded-xl">
        <h2 className="mb-4 font-bold text-mid text-subBlack">Step 1. Upload pages</h2>

        {/* Select File */}
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center w-full py-10 border border-dashed rounded-lg cursor-pointer border-subBlack text-subBlack"
        >
          <Icon icon="solar:gallery-minimalistic-bold-duotone" width={23} />
          <span className="text-sm">Select file</span>
        </label>
        <input
          id="fileInput"
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Or Divider */}
        <div className="flex items-center my-4 text-sm opacity-50 text-subBlack">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-4">Or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Camera Upload */}
        <label
          htmlFor="cameraInput"
          className="flex items-center justify-center w-full py-3 text-sm text-white rounded-full cursor-pointer bg-subGreen"
        >
          <Icon icon="solar:camera-bold-duotone" width={20} />
          Open camera & Take photo
        </label>
        <input
          id="cameraInput"
          type="file"
          ref={cameraInputRef}
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* STEP 1-2: 썸네일 표시 */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {images.map((img) => (
              <ImageThumbnail key={img.id} image={img} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed flex justify-between w-full max-w-screen-sm px-4 bottom-4">
        <button className="px-6 py-2 text-white rounded-md bg-subBlack" onClick={() => navigate('/entry')}>
          <Icon icon="mingcute:left-line" width={18} />
          Back
        </button>
        <button
          className={`rounded-md px-6 py-2 text-white transition-colors ${
            images.length > 0 ? 'bg-pointGreen' : 'cursor-not-allowed bg-gray-400'
          }`}
          disabled={images.length === 0}
          onClick={() => navigate('/extract')}
        >
          Next
          <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default UploadProc;
