import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Icon } from '@iconify/react';
import { transformState } from '@recoil/transformState';
import { stepState } from '@recoil/stepState';
import { fromOptionsState, toOptionsState } from '@recoil/uploadState';
import StepIndicator from '@components/StepIndicator';
import OptionsSelector from '@components/OptionsSelector';

const SelectCard = () => {
  const navigate = useNavigate();
  const [, setStep] = useRecoilState(stepState);
  const [transform, setTransform] = useRecoilState(transformState);

  const fromOptions = useRecoilValue(fromOptionsState);
  const toOptions = useRecoilValue(toOptionsState);

  const [fromSelected, setFromSelected] = useState<Record<number, { name: string; version: string }>>({});
  const [toSelected, setToSelected] = useState<Record<number, { name: string; version: string }>>({});

  useEffect(() => {
    setStep(2);
  }, [setStep]);

  const handleSelect = (type: string, field: 'name' | 'version', value: string) => {
    setToSelections((prev) => ({
      ...prev,
      [type]: {
        ...(prev[type] || {}),
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    const selected = toSelections['framework'];
    if (selected) {
      setTransform({
        fromFramework: fromOptions.find((o) => o.type === 'framework')?.name || '',
        fromVersion: fromOptions.find((o) => o.type === 'framework')?.possible_versions[0] || '',
        toFramework: selected.name,
        toVersion: selected.version,
      });
    }
    navigate('/select/check');
  };

  return (
    <div className="flex w-full flex-col items-center bg-black">
      <StepIndicator />
      <div className="min-h-card w-full rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-mid font-bold text-subBlack">Step 2. Select transformation</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="mb-4 text-center font-semibold text-subBlack">Detect(From)</h3>
            {fromOptions.map((item) => (
              <div key={item.id} className="mb-3">
                <p className="mb-1 text-xs text-gray-600">{item.type}</p>
                <div className="flex gap-2">
                  <span className="rounded bg-whiteGreen px-3 py-1 text-sm">{item.name}</span>
                  <span className="rounded bg-whiteGreen px-3 py-1 text-sm">{item.possible_versions[0]}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-4 text-center font-semibold text-subBlack">Suggest(To)</h3>
            {/*
            
            {toOptions.map((group) => (
              <div key={group.id} className="mb-4">
                <p className="mb-1 text-xs text-gray-600">{group.type}</p>
                <div className="flex gap-2 mb-2">
                  <select
                    className="px-3 py-1 text-sm rounded bg-whiteGreen"
                    value={toSelections[group.type]?.name || ''}
                    onChange={(e) => handleSelect(group.type, 'name', e.target.value)}
                  >
                    <option value="">Select</option>
                    {group.suggestions.map((sug) => (
                      <option key={sug.name} value={sug.name}>
                        {sug.name}
                      </option>
                    ))}
                  </select>

                  <select
                    className="px-3 py-1 text-sm rounded bg-whiteGreen"
                    value={toSelections[group.type]?.version || ''}
                    onChange={(e) => handleSelect(group.type, 'version', e.target.value)}
                    disabled={!toSelections[group.type]?.name}
                  >
                    <option value="">Version</option>
                    {group.suggestions
                      .find((sug) => sug.name === toSelections[group.type]?.name)
                      ?.versions.map((ver) => (
                        <option key={ver} value={ver}>
                          {ver}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
              */}
            <OptionsSelector fromOptions={fromOptions} toOptions={toOptions} />
          </div>
        </div>
      </div>
      */
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
          onClick={() => navigate('/select/check')}
        >
          Next
          <Icon icon="mingcute:right-line" width={18} />
        </button>
      </div>
    </div>
  );
};

export default SelectCard;
