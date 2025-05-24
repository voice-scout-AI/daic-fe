import { FC } from 'react';
import { UploadedImage, uploadedImageState } from '@constants/uploadState';
import { useRecoilState } from 'recoil';
import { Icon } from '@iconify/react';

interface Props {
  image: UploadedImage;
}

const ImageThumbnail: FC<Props> = ({ image }) => {
  const [, setImages] = useRecoilState(uploadedImageState);

  const handleRemove = () => {
    setImages((prev) => prev.filter((img) => img.id !== image.id));
  };

  return (
    <div className="relative w-20 h-24 overflow-hidden bg-gray-100 rounded-md group">
      <img src={URL.createObjectURL(image.file)} alt={image.file.name} className="object-cover w-full h-full" />

      <button
        onClick={handleRemove}
        className="absolute right-1.5 top-1.5 z-10 rounded-full bg-black/60 p-[2px] text-white hover:bg-black/80"
      >
        <Icon icon="material-symbols:cancel-rounded" width={17} />
      </button>

      <div className="absolute bottom-0 w-full truncate bg-white/70 px-1 text-center text-[8px] text-black">
        {image.file.name}
      </div>
    </div>
  );
};

export default ImageThumbnail;
