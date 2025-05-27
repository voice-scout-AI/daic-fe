import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Icon } from '@iconify/react';

import { dummy_ocr } from '@api/dummy'; //////////// 수정하기!!
import { stepState } from '@recoil/stepState';
import { fromOptionsState } from '@recoil/uploadState';
import StepIndicator from '@components/StepIndicator';

const ExtractedProc = () => {
  const navigate = useNavigate();
  const setStep = useSetRecoilState(stepState);
  const fromOptions = useRecoilValue(fromOptionsState);

  useEffect(() => {
    setStep(1);
  }, [setStep]);

  const handleCopy = () => {
    navigator.clipboard.writeText(dummy_ocr);
    toast.success('코드가 복사되었습니다!');
  };

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <StepIndicator />

      <div className="w-full rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-mid font-bold text-subBlack">Step 1. Upload pages</h2>

        <div className="relative">
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md bg-subGreen px-2 py-1 text-xs text-white"
          >
            <Icon icon="mingcute:copy-line" width={14} /> Copy
          </button>

          <SyntaxHighlighter
            language={fromOptions.filter((option) => option.type === 'language')[0]?.name ?? 'shell'}
            style={oneDark}
            customStyle={{ padding: '15px' }}
            wrapLines
          >
            {dummy_ocr}
          </SyntaxHighlighter>
        </div>
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
          className="w-button flex items-center justify-between rounded-md bg-pointGreen px-4 py-2 text-white"
          onClick={() => navigate('/select')}
        >
          Next
          <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default ExtractedProc;
