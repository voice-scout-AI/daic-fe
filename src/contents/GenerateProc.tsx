import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { stepState } from '@recoil/stepState';
import StepIndicator from '@components/StepIndicator';

import { Icon } from '@iconify/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { dummy_from_code, dummy_to_code } from '@api/dummy';

const GenerateProc = () => {
  const [, setStep] = useRecoilState(stepState);
  const [showConverted, setShowConverted] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setStep(3);
  }, [setStep]);

  const handleCopy = async () => {
    const code = showConverted ? dummy_to_code : dummy_from_code;
    await navigator.clipboard.writeText(code);
    toast.success('코드가 복사되었습니다!');
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-10 pb-24 text-white bg-black">
      <StepIndicator />

      <div className="w-full px-6 py-8 mt-6 text-black bg-white shadow-md rounded-xl">
        <h2 className="mb-4 font-bold text-mid text-subBlack">Step 3. Generate</h2>

        <div className="flex items-center mb-2">
          <span className="mr-2 text-sm font-semibold text-subBlack">{showConverted ? 'To' : 'From'}</span>
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

        <p className="mb-2 text-xs text-gray-500">Main.tsx</p>

        <div className="relative">
          <button
            className="absolute flex items-center gap-1 px-2 py-1 text-xs text-white rounded right-2 top-2 bg-subGreen"
            onClick={handleCopy}
          >
            <Icon icon="mingcute:copy-line" width={14} /> Copy
          </button>

          <SyntaxHighlighter language="javascript" style={oneDark} customStyle={{ borderRadius: '8px' }} wrapLines>
            {showConverted ? dummy_to_code : dummy_from_code}
          </SyntaxHighlighter>
        </div>

        <button onClick={() => navigate('/')} className="w-full py-2 mt-6 font-bold text-white rounded bg-pointGreen">
          Done
        </button>
      </div>
    </div>
  );
};

export default GenerateProc;
