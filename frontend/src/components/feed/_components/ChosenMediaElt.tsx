import { XCircle } from "lucide-react";
import { COLOR_SCHEMA } from "../../../utils/constants";
import { readMediaFile } from "../../../utils/medias";
import { useEffect, useState } from "react";
import { MediaFileType } from "../../../stores/FeedFormStore";
import Loader from "../../cross-app/Loader";

const ImageChosen = ({
  file,
  isPlaceholder = false,
  remainingFiles,
  removeFile,
}: {
  file: MediaFileType;
  isPlaceholder?: boolean;
  remainingFiles?: number;
  removeFile?: (id: string) => void;
}) => {
  const [url, setUrl] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    readMediaFile(file.data)
      .then((url) => setUrl(url as string))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="media__container">
      {url ? (
        <img src={url as string} alt="#" />
      ) : (
        <div className="loader__layer">
          <Loader height={30} width={30} trackColor={COLOR_SCHEMA.white} />
        </div>
      )}
      <div className={`blur ${url ? "trigger" : null}`}>
        {isPlaceholder ? (
          <span className="text">And {remainingFiles} more</span>
        ) : (
          <button
            type="button"
            className="remove__media"
            onClick={() => {
              if (removeFile) {
                removeFile(file.id);
              }
            }}
          >
            <XCircle stroke={COLOR_SCHEMA.white} size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageChosen;
