import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import { stepState } from '@recoil/stepState';
import { transformState } from '@recoil/selectState';
import { fromOptionsState } from '@recoil/uploadState';
import StepIndicator from '@components/StepIndicator';

import { Icon } from '@iconify/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { dummy_from_code, dummy_to_code } from '@api/dummy';

const GenerateProc = () => {
  const [, setStep] = useRecoilState(stepState);
  const [showConverted, setShowConverted] = useState(true);
  const transformedCodes = useRecoilValue(transformState);
  const navigate = useNavigate();

  useEffect(() => {
    setStep(3);
  }, [setStep]);

  const transformedCode = transformedCodes.length > 0 ? transformedCodes[0].transformed_code : '';

  const originalCode = transformedCodes.length > 0 ? transformedCodes[0].original_code : '';

  const codeToShow = showConverted ? transformedCode : originalCode;

  const handleCopy = async () => {
    if (!codeToShow) {
      toast.error('복사할 코드가 없습니다.');
      return;
    }
    await navigator.clipboard.writeText(codeToShow);
    toast.success('코드가 복사되었습니다!');
  };

  return (
    <div className="flex flex-col items-center w-full bg-black">
      <StepIndicator />

      <div className="w-full p-6 bg-white shadow-md min-h-card rounded-xl">
        <h2 className="mb-4 font-bold text-mid text-subBlack">Step 3. Generate results.</h2>

        <div className="flex items-center mt-10 mb-2">
          <span className="mr-2 text-sm font-semibold text-subBlack">
            {showConverted ? 'To (Transformed)' : 'From (Original)'}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={showConverted}
              onChange={() => setShowConverted(!showConverted)}
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:bg-pointGreen peer-checked:after:translate-x-full peer-focus:outline-none"></div>
          </label>
        </div>

        <div className="w-full p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 font-bold text-mid text-subBlack">Generated Code</h2>

          <div className="relative">
            <button
              onClick={handleCopy}
              className="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs text-white rounded-md right-2 top-2 bg-subGreen"
            >
              <Icon icon="mingcute:copy-line" width={14} /> Copy
            </button>

            <SyntaxHighlighter language="typescript" style={oneDark} customStyle={{ padding: '15px' }} wrapLines>
              {codeToShow}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateProc;
