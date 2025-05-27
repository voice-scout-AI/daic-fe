import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { stepState } from '@recoil/stepState';
import { transformState } from '@recoil/transformState';
import StepIndicator from '@components/StepIndicator';
import { useNavigate } from 'react-router-dom';

const ConvertProc = () => {
  const navigate = useNavigate();
  const setStep = useSetRecoilState(stepState);
  const { fromFramework, fromVersion, toFramework, toVersion } = useRecoilValue(transformState);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStep(2);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/generate'), 1000); // 자동 이동
          return 100;
        }
        return prev + 10;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [navigate, setStep]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-4 pb-24 pt-10">
      <StepIndicator />

      <div className="mt-6 w-full rounded-xl bg-white px-6 py-8 text-center shadow-md">
        <h2 className="mb-4 font-bold text-subBlack">Step 2. Transform</h2>

        <p className="mb-4 text-sm text-subBlack">
          Converting from{' '}
          <span className="font-bold text-pointGreen">
            {fromFramework} {fromVersion}
          </span>{' '}
          to{' '}
          <span className="font-bold text-pointGreen">
            {toFramework} {toVersion}
          </span>
        </p>

        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
          <div className="h-full bg-pointGreen transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="te:xt-subBlack mt-2 text-sm">{progress}%</p>
      </div>
    </div>
  );
};

export default ConvertProc;
