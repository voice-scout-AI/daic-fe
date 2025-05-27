import { useEffect } from 'react';
import { uploadedImageState } from '@recoil/uploadState';
import { UploadedImage } from '@api/UploadProc.interface';
import { useRecoilState } from 'recoil';
import { Icon } from '@iconify/react';

const ImageThumbnail = ({ image }: { image: UploadedImage }) => {
  const [, setImages] = useRecoilState(uploadedImageState);

  const handleRemove = () => {
    URL.revokeObjectURL(image.previewUrl);
    setImages((prev) => prev.filter((img) => img.id !== image.id));
  };

  return (
    <div className="relative flex w-[80px] flex-col items-center">
      <div className="relative h-[80px] w-[80px] rounded bg-gray-300">
        <img src={image.previewUrl} alt={image.file.name} className="h-full w-full rounded object-cover" />
      </div>
      <button
        onClick={handleRemove}
        className="absolute -right-2 -top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-subBlack text-white shadow-md"
      >
        <Icon icon="material-symbols:close-rounded" width={10} />
      </button>

      <div className="mt-1 w-full truncate text-center text-[10px] text-black">{image.file.name}</div>
    </div>
  );
};

export default ImageThumbnail;
