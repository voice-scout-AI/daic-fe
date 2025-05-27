import { useState } from 'react';

import { FromOptions, ToOptions } from '@api/UploadProc.interface';

interface SelectCardProps {
  fromOptions: FromOptions[];
  toOptions: ToOptions[];
  fromSelected: Record<number, { name: string; version: string }>;
  toSelected: Record<number, { name: string; version: string }>;
  onFromChange: (id: number, field: 'name' | 'version', value: string) => void;
  onToChange: (id: number, field: 'name' | 'version', value: string) => void;
}

const OptionsSelector = ({
  fromOptions,
  toOptions,
  fromSelected,
  toSelected,
  onFromChange,
  onToChange,
}: SelectCardProps) => {
  const renderFromOption = (option: FromOptions) => {
    const selected = fromSelected[option.id] || { name: option.name, version: option.possible_versions[0] };

    return (
      <div key={option.id} className="mb-4">
        <div className="mb-1 text-sm font-semibold capitalize">{option.type}</div>
        <div className="flex space-x-2">
          <select
            className="rounded bg-green-100 p-2"
            value={selected.name}
            onChange={(e) => onFromChange(option.id, 'name', e.target.value)}
          >
            <option value={option.name}>{option.name}</option>
          </select>
          <select
            className="rounded bg-green-100 p-2"
            value={selected.version}
            onChange={(e) => onFromChange(option.id, 'version', e.target.value)}
          >
            {option.possible_versions.map((ver) => (
              <option key={ver} value={ver}>
                {ver}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const renderToOption = (option: ToOptions) => {
    const selected = toSelected[option.id] || { name: '', version: '' };

    return (
      <div key={option.id} className="mb-4">
        <div className="mb-1 text-sm font-semibold capitalize">{option.type}</div>
        {option.suggestions.map((sugg) => {
          const selectedName = selected.name || sugg.name;
          const selectedVersion = selected.version || sugg.versions[0];

          return (
            <div key={sugg.name} className="mb-1 flex space-x-2">
              <select
                className="rounded bg-green-100 p-2"
                value={selectedName}
                onChange={(e) => onToChange(option.id, 'name', e.target.value)}
              >
                <option value={sugg.name}>{sugg.name}</option>
              </select>
              <select
                className="rounded bg-green-100 p-2"
                value={selectedVersion}
                onChange={(e) => onToChange(option.id, 'version', e.target.value)}
              >
                {sugg.versions.map((ver) => (
                  <option key={ver} value={ver}>
                    {ver}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex space-x-20 p-6">
      <div className="flex-1">
        <h2 className="mb-4 text-lg font-bold">Detect (From)</h2>
        {fromOptions.map(renderFromOption)}
      </div>
      <div className="flex-1">
        <h2 className="mb-4 text-lg font-bold">Suggest (To)</h2>
        {toOptions.map(renderToOption)}
      </div>
    </div>
  );
};

export default OptionsSelector;
