import {
  PropsWithChildren,
  useRef,
  useState,
  useEffect,
  type FormEvent,
} from "react";
import "../assets/style/perPage/profile.scss";
import MobilePagesSubTopBar from "../components/cross-app/MobilePagesSubTopBar";
import { Image } from "lucide-react";
import { convertImageSizeToMo, readMediaFile } from "../utils/medias";
import Loader from "../components/cross-app/Loader";
import { userProfileSchema } from "../utils/yupSchemas";
import { enqueueSnackbar } from "notistack";
import {
  nameMaxLength,
  nameMinLength,
  passwordMaxLength,
  passwordMinLength,
} from "../utils/constants";
import { useUpdateUserProfile } from "../hooks/userHooks";
import { StateUserType } from "../types/types";
import useAppStore from "../stores/AppStore";

const DisplayImage = ({
  file,
  fileUrl,
}: PropsWithChildren<{ file: File | null; fileUrl?: string }>) => {
  const [url, setUrl] = useState<string | ArrayBuffer | undefined>(fileUrl);

  useEffect(() => {
    if (file) {
      readMediaFile(file)
        .then((url) => setUrl(url as string))
        .catch(() => {
          setUrl(undefined);
        });
    }
  }, []);

  return (
    <>
      {url ? (
        <img src={url as string} alt={file?.name} />
      ) : (
        <Loader height={40} width={40} />
      )}
    </>
  );
};

const ImageSelectorButton = ({ selectImage }: { selectImage: () => void }) => {
  return (
    <button type="button" className="change__image" onClick={selectImage}>
      <span>Change Image [1Mo max]</span>
      <span className="icon">
        <Image size={20} />
      </span>
    </button>
  );
};

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAppStore((state) => state.auth);

  const [file, setFile] = useState<File | null>(null);

  const selectImage = () => {
    const fileInput = fileInputRef.current;
    fileInput?.click();

    fileInput?.addEventListener("change", function () {
      const files = fileInput.files;

      if (files) {
        const file = files[0];
        setFile(file);
      }
    });
  };

  const { isPending, mutate } = useUpdateUserProfile();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const profile = {
      name: data.get("name"),
      password: data.get("password"),
      picture: data.get("picture"),
    } as StateUserType;

    let isValid = userProfileSchema.isValidSync(profile);

    if (!isValid) {
      return enqueueSnackbar("Données invalides ou incomplètes !");
    }

    // Send to the backend
    mutate(profile);
  };

  return (
    <main className="profile__page">
      <MobilePagesSubTopBar title="Profile" />
      <div className="container form__container">
        <form className="inputs" onSubmit={handleSubmit}>
          <div className="wrap__input">
            <label htmlFor="name">
              Username [Between {nameMinLength}-{nameMaxLength} characters]
            </label>
            <input
              type="text"
              placeholder="ex : Nzanzu Lwanzo"
              name="name"
              required
              min={nameMinLength}
              max={nameMaxLength}
              defaultValue={auth?.name}
            />
          </div>
          <div className="wrap__input">
            <label htmlFor="name">Password</label>
            <input
              type="text"
              placeholder="You're gonna have to provide a new one"
              name="password"
              required
              min={passwordMinLength}
              max={passwordMaxLength}
            />
          </div>
          <div className="preview__image center">
            {auth?.picture ? (
              <>
                <img src={auth.picture} alt={`Profile image of ${auth.name}`} />
                <ImageSelectorButton selectImage={selectImage} />
              </>
            ) : (
              <>
                {file ? (
                  <>
                    <DisplayImage file={file} />
                    <ImageSelectorButton selectImage={selectImage} />
                  </>
                ) : (
                  <>
                    <p
                      className="no__profile__picture__message"
                      onClick={selectImage}
                    >
                      You have no profile picture, for the moment. Click to add
                      one !
                      <br />1 Mo max size
                    </p>
                  </>
                )}
              </>
            )}

            <input
              type="file"
              accept="image/*"
              name="picture"
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </div>
          <span className="caveat__on__image__size">
            *CAVEAT : The image must weight 1Mo max size. The currently selected
            image weights {convertImageSizeToMo(file?.size)}Mo.
          </span>
          <button type="submit" className="submit__button">
            {isPending ? <Loader height={23} width={23} /> : "Submit"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Profile;
