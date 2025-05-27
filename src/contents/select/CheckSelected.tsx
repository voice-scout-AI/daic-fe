import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { transformState } from '@recoil/transformState';
import { stepState } from '@recoil/stepState';
import { useNavigate } from 'react-router-dom';
import StepIndicator from '@components/StepIndicator';
import { Icon } from '@iconify/react';

const CheckSelected = () => {
  const navigate = useNavigate();
  const setStep = useSetRecoilState(stepState);
  const { fromFramework, fromVersion, toFramework, toVersion } = useRecoilValue(transformState);

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-4 pb-24 pt-10">
      <StepIndicator />

      <div className="mt-6 w-full rounded-xl bg-white px-6 py-8 shadow-md">
        <h2 className="mb-4 text-mid font-bold text-subBlack">Step 2. Transform</h2>

        <div className="flex flex-col items-center justify-center text-center text-subBlack">
          <p className="mb-2 text-sm">You're about to convert from:</p>
          <p className="text-title font-bold text-pointGreen">
            {fromFramework} {fromVersion || ''}
          </p>
          <p className="my-2 text-sm">to</p>
          <p className="text-title font-bold text-pointGreen">
            {toFramework} {toVersion || ''}
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 flex w-full max-w-screen-sm justify-between px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 rounded-md bg-subBlack px-6 py-2 text-white"
        >
          <Icon icon="mingcute:left-line" width={18} /> Back
        </button>
        <button
          onClick={() => navigate('/convert')}
          className="flex items-center gap-1 rounded-md bg-pointGreen px-6 py-2 text-white"
        >
          Convert <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default CheckSelected;
