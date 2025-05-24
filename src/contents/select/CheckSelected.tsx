import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { transformState } from '@constants/transformState';
import { stepState } from '@constants/stepState';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '@components/StepIndicator';
import { Icon } from '@iconify/react';

const CheckSelected = () => {
  const navigate = useNavigate();
  const setStep = useSetRecoilState(stepState);
  const { fromFramework, fromVersion, toFramework, toVersion } = useRecoilValue(transformState);

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-10 pb-24 bg-black">
      <StepIndicator />

      <div className="w-full px-6 py-8 mt-6 bg-white shadow-md rounded-xl">
        <h2 className="mb-4 font-bold text-mid text-subBlack">Step 2. Transform</h2>

        <div className="flex flex-col items-center justify-center text-center text-subBlack">
          <p className="mb-2 text-sm">You're about to convert from:</p>
          <p className="font-bold text-title text-pointGreen">
            {fromFramework} {fromVersion || ''}
          </p>
          <p className="my-2 text-sm">to</p>
          <p className="font-bold text-title text-pointGreen">
            {toFramework} {toVersion || ''}
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed flex justify-between w-full max-w-screen-sm px-4 bottom-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 px-6 py-2 text-white rounded-md bg-subBlack"
        >
          <Icon icon="mingcute:left-line" width={18} /> Back
        </button>
        <button
          onClick={() => navigate('/convert')}
          className="flex items-center gap-1 px-6 py-2 text-white rounded-md bg-pointGreen"
        >
          Convert <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default CheckSelected;
