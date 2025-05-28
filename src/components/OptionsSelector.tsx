import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { fromOptionsState, toOptionsState } from '@recoil/uploadState';
import { selectState } from '@recoil/selectState';
import { SelectedOptions } from '@api/Transform.interface';

const OptionsSelector = () => {
  const fromOptions = useRecoilValue(fromOptionsState);
  const toOptions = useRecoilValue(toOptionsState);
  const [selected, setSelected] = useRecoilState(selectState);

  useEffect(() => {
    if (fromOptions.length === 0) return;

    const initialSelected: SelectedOptions[] = fromOptions.map((from) => {
      const toOpt = toOptions.find((to) => to.type === from.type);

      const toName = toOpt?.suggestions[0]?.name || '';
      const toVersion = toOpt?.suggestions[0]?.versions[0] || '';

      return {
        id: String(from.id),
        from: [from.name, from.possible_versions[0] || ''],
        to: [toName, toVersion],
      };
    });
    setSelected(initialSelected);
  }, [fromOptions, toOptions, setSelected]);

  const onFromVersionChange = (id: string, newVersion: string) => {
    setSelected((prev) => prev.map((sel) => (sel.id === id ? { ...sel, from: [sel.from[0], newVersion] } : sel)));
  };

  const onToNameChange = (id: string, newName: string) => {
    setSelected((prev) =>
      prev.map((sel) => {
        if (sel.id === id) {
          const toOpt = toOptions.find((to) => to.type === fromOptions.find((f) => String(f.id) === id)?.type);
          const version = toOpt?.suggestions.find((s) => s.name === newName)?.versions[0] || '';
          return { ...sel, to: [newName, version] };
        }
        return sel;
      }),
    );
  };

  const onToVersionChange = (id: string, newVersion: string) => {
    setSelected((prev) => prev.map((sel) => (sel.id === id ? { ...sel, to: [sel.to[0], newVersion] } : sel)));
  };

  return (
    <div className="flex mt-10 justify-evenly">
      <div className="flex w-[45%] flex-col gap-5">
        <h3 className="font-bold text-md">Detect(From)</h3>
        {fromOptions.map((from) => (
          <div key={from.id} className="flex items-center gap-4">
            <div className="w-[45%] cursor-default rounded-lg bg-green-100 px-3 py-2 text-exsm text-pointGreen">
              {from.name}
            </div>

            <select
              className="w-[45%] rounded-lg bg-gray-100 px-3 py-2 text-exsm text-pointGreen"
              value={selected.find((sel) => sel.id === String(from.id))?.from[1] || ''}
              onChange={(e) => onFromVersionChange(String(from.id), e.target.value)}
            >
              {from.possible_versions.map((ver, idx) => (
                <option key={`${ver}-${idx}`} value={ver}>
                  {ver}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="flex w-[45%] flex-col gap-5">
        <h3 className="font-bold text-md">Suggest(To)</h3>
        {fromOptions.map((from) => {
          const toOpt = toOptions.find((to) => to.type === from.type);
          if (!toOpt) return null;

          const sel = selected.find((sel) => sel.id === String(from.id));

          return (
            <div key={from.id} className="flex items-center gap-4">
              <select
                className="w-[45%] rounded-lg bg-gray-100 px-3 py-2 text-exsm text-pointGreen"
                value={sel?.to[0] || ''}
                onChange={(e) => onToNameChange(String(from.id), e.target.value)}
              >
                {toOpt.suggestions.map((sugg) => (
                  <option key={sugg.name} value={sugg.name}>
                    {sugg.name}
                  </option>
                ))}
              </select>
              <select
                className="w-[45%] rounded-lg bg-gray-100 px-3 py-2 text-exsm text-pointGreen"
                value={sel?.to[1] || ''}
                onChange={(e) => onToVersionChange(String(from.id), e.target.value)}
              >
                {toOpt.suggestions
                  .find((s) => s.name === (sel?.to[0] || ''))
                  ?.versions.map((ver, idx) => (
                    <option key={`${ver}-${idx}`} value={ver}>
                      {ver}
                    </option>
                  )) || null}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsSelector;
