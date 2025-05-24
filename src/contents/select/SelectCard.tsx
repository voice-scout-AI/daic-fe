import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Icon } from '@iconify/react';
import { transformState } from '@constants/transformState';
import { stepState } from '@constants/stepState';
import { ocrDataState } from '@constants/uploadState';
import StepIndicator from '@components/StepIndicator';

const SelectCard = () => {
  const navigate = useNavigate();
  const [, setStep] = useRecoilState(stepState);
  const [transform, setTransform] = useRecoilState(transformState);
  const ocrTextList = useRecoilValue(ocrDataState);
  const ocrText = ocrTextList[0];

  const [fromFramework, setFromFramework] = useState('');
  const [fromVersion, setFromVersion] = useState('');
  const [toFramework, setToFramework] = useState(transform.toFramework || '');
  const [toVersion, setToVersion] = useState(transform.toVersion || '');

  useEffect(() => {
    setStep(2);
  }, [setStep]);

  useEffect(() => {
    if (ocrText?.fromFramework) {
      setFromFramework(ocrText.fromFramework);
    }
    if (ocrText?.fromVersion) {
      setFromVersion(ocrText.fromVersion);
    }
  }, [ocrText]);

  const handleNext = () => {
    setTransform({ fromFramework, fromVersion, toFramework, toVersion });
    navigate('/select/check');
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <StepIndicator />

      {/* 카드 */}
      <div className="w-full max-w-screen-sm px-6 py-8 bg-white shadow-md rounded-xl">
        {/* 헤더 */}
        <h2 className="mb-6 font-bold text-mid text-subBlack">Step 2. Transform</h2>

        {/* From / To */}
        <div className="grid grid-cols-2 gap-8">
          {/* From */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">From</label>
            <select
              value={fromFramework}
              onChange={(e) => setFromFramework(e.target.value)}
              className="p-2 rounded bg-whiteGreen"
            >
              <option value="">Select Framework</option>
              <option value="React">React</option>
              <option value="Vue">Vue</option>
              <option value="Angular">Angular</option>
            </select>
            <input
              type="text"
              placeholder="Version"
              value={fromVersion}
              onChange={(e) => setFromVersion(e.target.value)}
              className="p-2 rounded bg-whiteGreen"
            />
          </div>

          {/* To */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold">To</label>
            <select
              value={toFramework}
              onChange={(e) => setToFramework(e.target.value)}
              className="p-2 rounded bg-whiteGreen"
            >
              <option value="">Select Framework</option>
              <option value="React">React</option>
              <option value="Vue">Vue</option>
              <option value="Angular">Angular</option>
            </select>
            <input
              type="text"
              placeholder="Version (e.g. 18.2)"
              value={toVersion}
              onChange={(e) => setToVersion(e.target.value)}
              className="p-2 rounded bg-whiteGreen"
            />
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="flex justify-between w-full px-6 mt-8">
        <button
          onClick={() => navigate('/extract')}
          className="flex items-center gap-1 px-6 py-2 text-white rounded bg-subBlack"
        >
          <Icon icon="mingcute:left-line" width={18} />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-1 px-6 py-2 font-bold text-black rounded bg-pointGreen"
        >
          Next
          <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default SelectCard;
