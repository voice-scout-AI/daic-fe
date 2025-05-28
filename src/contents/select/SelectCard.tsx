import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Icon } from '@iconify/react';
import { stepState } from '@recoil/stepState';
import { uploadedImageState } from '@recoil/uploadState';
import { transformState } from '@recoil/selectState';
import StepIndicator from '@components/StepIndicator';
import { selectState } from '@recoil/selectState';
import { FromOptions, ToOptions, Suggestions } from '@api/Upload.interface';
import { SelectedOptions } from '@api/Transform.interface';
import OptionsSelector from '@components/OptionsSelector';
import toast from 'react-hot-toast';
import { transformRequest } from '@api/transform';

const SelectCard = () => {
  const navigate = useNavigate();
  const [, setStep] = useRecoilState(stepState);
  const selectedOptions = useRecoilValue(selectState);
  const uploadedImages = useRecoilValue(uploadedImageState);
  const setTransformState = useSetRecoilState(transformState);

  useEffect(() => {
    setStep(2);
  }, [setStep]);

  const handleGenerate = async () => {
    try {
      const transformedCodes = await transformRequest(selectedOptions, uploadedImages);
      setTransformState(transformedCodes);
      toast.success('코드 변환에 성공했어요.');
      navigate('/generate');
    } catch (err) {
      console.error(err);
      toast.error('코드 변환에 실패했어요.');
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-black">
      <StepIndicator />

      <div className="w-full p-6 bg-white shadow-md min-h-card rounded-xl">
        <h2 className="mb-4 font-bold text-mid text-subBlack">Step 2. Transform your codes.</h2>
        <OptionsSelector />
      </div>

      <div className="flex justify-between w-full max-w-screen-sm mt-10">
        <button
          className="flex items-center justify-between px-4 py-2 text-white rounded-md w-button bg-subBlack"
          onClick={() => navigate(-1)}
        >
          <Icon icon="mingcute:left-line" width={18} />
          Back
        </button>
        <button
          className="flex items-center justify-between px-4 py-2 text-white rounded-md w-button bg-pointGreen"
          // onClick={() => navigate('/select/check')}
          onClick={handleGenerate}
        >
          Next
          <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default SelectCard;
