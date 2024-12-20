import { ImagePlus, Clapperboard } from "lucide-react";
import { ChangeEvent, useRef } from "react";

const SelectMedias = ({
  onMediaSelected,
}: {
  onMediaSelected: (files: File[] | FileList | null) => void;
}) => {
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  const onSelectedMedias = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    onMediaSelected(files);
  };

  return (
    <div className="select__medias">
      <button type="button" onClick={() => mediaInputRef?.current?.click()}>
        <Clapperboard size={20} />
      </button>
      <button type="button">
        <ImagePlus size={20} onClick={() => mediaInputRef?.current?.click()} />
      </button>

      <input
        type="file"
        multiple
        accept="image/*"
        style={{ display: "none" }}
        id="upload__medias"
        ref={mediaInputRef}
        onChange={onSelectedMedias}
        name="medias"
      />
    </div>
  );
};

export default SelectMedias;
