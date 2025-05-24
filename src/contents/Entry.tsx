import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Entry = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-start px-4 text-center font-sans">
      <h1 className="mb-4 font-bold leading-snug text-title text-pointGreen">
        Update
        <br />
        Legacy Code
        <br />
        in Seconds.
      </h1>

      <p className="mb-24 text-sm text-exsm text-whiteGreen">
        Upload book pages,
        <br />
        choose your frameworks,
        <br />
        get modernized code.
      </p>

      <button
        onClick={() => navigate('/upload')}
        className="flex items-center justify-center w-20 h-20 rounded-full shadow-lg bg-pointGreen"
      >
        <Icon icon="gridicons:play" width={100} />
      </button>
    </div>
  );
};

export default Entry;
