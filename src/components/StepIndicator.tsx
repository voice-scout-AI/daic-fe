import { useRecoilValue } from 'recoil';
import { stepState } from '@recoil/stepState';

const StepIndicator = () => {
  const step = useRecoilValue(stepState);

  return (
    <div className="mb-10 flex w-full items-center justify-around">
      {['Upload', 'Transform', 'Generate'].map((label, index) => {
        const stepIndex = index + 1;
        const isActive = step === stepIndex;
        const isPassed = step >= stepIndex;

        return (
          <div key={label} className="flex flex-col items-center">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full font-bold text-white ${
                isPassed ? 'bg-pointGreen' : 'bg-whiteGreen text-subBlack'
              }`}
            >
              {stepIndex}
            </div>
            <span className={`mt-1 text-sm font-medium ${isActive ? 'text-pointGreen' : 'text-transparent'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
