import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dummy_ocr } from '@api/dummy';

import { stepState } from '@constants/stepState';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import StepIndicator from '@components/StepIndicator';
import { Icon } from '@iconify/react';

const ExtractedProc = () => {
  const navigate = useNavigate();
  const setStep = useSetRecoilState(stepState);

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  const handleCopy = () => {
    navigator.clipboard.writeText(dummy_ocr);
    toast.success('코드가 복사되었습니다!');
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* StepIndicator */}
      <div className="mb-4">
        <StepIndicator />
      </div>

      {/* 카드 */}
      <div className="w-full p-4 bg-white shadow-md rounded-xl">
        <h2 className="mb-4 text-sm font-semibold text-subBlack">Step 1. Upload pages</h2>

        <div className="relative">
          <button
            onClick={handleCopy}
            className="absolute z-10 flex items-center gap-1 px-2 py-1 text-xs text-white bg-black rounded-md right-2 top-2"
          >
            <Icon icon="mingcute:copy-line" width={14} /> Copy
          </button>

          <SyntaxHighlighter
            language="javascript"
            style={oneDark}
            customStyle={{ borderRadius: '8px', paddingTop: '32px' }}
            wrapLines
          >
            {dummy_ocr}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-between w-full px-4 mt-6">
        <button className="px-4 py-2 text-white rounded-md bg-subBlack" onClick={() => navigate('/upload')}>
          <Icon icon="mingcute:left-line" width={18} />
          Back
        </button>
        <button className="px-4 py-2 text-white rounded-md bg-pointGreen" onClick={() => navigate('/select')}>
          Next
          <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default ExtractedProc;
