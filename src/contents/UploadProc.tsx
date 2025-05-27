import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { uploadedImageState, fromOptionsState, toOptionsState } from '@recoil/uploadState';
import { uploadImages } from '@api/upload';
import { stepState } from '@recoil/stepState';

import { UploadedImage, UploadImageResponse } from '@api/UploadProc.interface';

import StepIndicator from '@components/StepIndicator';
import ImageThumbnail from '@components/ImageThumbnail';
import { Icon } from '@iconify/react';

const UploadProc = () => {
  console.log('[UploadProc] 진입함');
  const [images, setImages] = useRecoilState(uploadedImageState);
  const setFromOptions = useSetRecoilState(fromOptionsState);
  const setToOptions = useSetRecoilState(toOptionsState);
  const [, setStep] = useRecoilState(stepState);
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStep((prev) => (prev !== 1 ? 1 : prev));
  }, [setStep]);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(
      (file) =>
        file.type.startsWith('image/') &&
        !images.some((img) => img.file.name === file.name && img.file.size === file.size),
    );

    if (validFiles.length === 0) {
      toast('모든 파일이 이미 추가되었거나 유효하지 않습니다.', { icon: '⚠️' });
      return;
    }

    const mappedImages: UploadedImage[] = validFiles.map((file) => ({
      id: uuidv4(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mappedImages]);
  };

  const handleExtract = async () => {
    if (images.length === 0 || isUploading) return;

    try {
      setIsUploading(true);

      const files = images.map((img) => img.file);
      const result: UploadImageResponse = await uploadImages(files);

      setFromOptions(result.from);
      setToOptions(result.to);

      toast.success('이미지 업로드에 성공했어요.');
      navigate('/extract');
    } catch (err) {
      console.error(err);
      toast.error('이미지 업로드에 실패했어요.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <StepIndicator />

      <div className="min-h-card w-full rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-mid font-bold text-subBlack">Step 1. Upload pages</h2>

        <label
          htmlFor="fileInput"
          className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-subGreen py-10 text-subGreen"
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)}
        />

        <div className="my-4 flex items-center text-sm opacity-50">
          <div className="h-px flex-1 bg-subGreen" />
          <span className="px-4 text-subGreen">Or</span>
          <div className="h-px flex-1 bg-subGreen" />
        </div>

        <label
          htmlFor="cameraInput"
          className="flex w-full cursor-pointer items-center justify-evenly rounded-full bg-subGreen py-3 text-sm text-white"
        >
          <Icon icon="solar:camera-bold-duotone" width={20} />
          {isUploading ? 'Uploading...' : 'Open camera'}
        </label>
        <input
          id="cameraInput"
          type="file"
          ref={cameraInputRef}
          accept="image/*"
          capture={'environment' as const}
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />

        {images?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {images.map((img) => (
              <ImageThumbnail key={img.id} image={img} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex w-full max-w-screen-sm justify-between">
        <button
          className="w-button flex items-center justify-between rounded-md bg-subBlack px-4 py-2 text-white"
          onClick={() => navigate(-1)}
        >
          <Icon icon="mingcute:left-line" width={18} />
          Back
        </button>
        <button
          className={`w-button flex items-center justify-between rounded-md px-4 py-2 text-white transition-colors ${
            images.length === 0 || isUploading ? 'cursor-not-allowed bg-gray-400' : 'bg-pointGreen'
          }`}
          disabled={isUploading || images.length === 0}
          onClick={handleExtract}
        >
          Next
          <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default UploadProc;
