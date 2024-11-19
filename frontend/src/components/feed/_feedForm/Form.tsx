import UserProfile from "../../cross-app/UserProfile";
import { Newspaper, Calendar } from "lucide-react";
import SelectMedias from "./SelectMedias";
import useFeedFormStore from "../../../stores/FeedFormStore";
import ListMedias from "../_components/ListMedias";
import { FormEvent, useState } from "react";
import { usePostAPost } from "../../../hooks/postHooks";
import Loader from "../../cross-app/Loader";
import { deviceSupportsBackgroundPeriodicSync } from "../../../utils/constants";
import { postMessageToWorker } from "../../../utils/handlersAndFormatters";
import { enqueueSnackbar } from "notistack";

const Form = () => {
  const { clearFiles, files, addFiles } = useFeedFormStore();
  const [textContent, setTextContent] = useState("");
  const [autoPostDateTime, setAutoPostDateTime] = useState<string | undefined>(
    undefined
  );
  const { isPending, mutate } = usePostAPost(() => {
    // Reset the states - On success
    setTextContent("");
    clearFiles();
  });

  const getFormData = () => {
    const post = new FormData();

    post.append("textContent", textContent);
    files.forEach((file) => {
      post.append("mediaFiles", file.data);
    });

    return post;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(getFormData());
  };

  const handleDraft = async () => {
    const post = {
      textContent: textContent,
      mediaFiles: files,
    };

    // Store in indexedDB
    if ((textContent && textContent.length > 0) || files.length >= 1) {
      postMessageToWorker({
        action: "SAVE",
        req_data: { ...post, autoPostDateTime },
      });
    }

    // Listen for the event response
    navigator.serviceWorker.addEventListener("message", ({ data }) => {
      switch (data.action) {
        case "SAVE": {
          if (data.ok) {
            clearFiles();
            setTextContent("");
            setAutoPostDateTime(undefined);
            enqueueSnackbar("Post saved in draft and will be auto posted !");
            break;
          } else {
            enqueueSnackbar(
              "We couldn't save the post in draft, refresh and retry !"
            );
            break;
          }
        }
      }
    });
  };

  return (
    <form action="#" method="post" id="new__post__form" onSubmit={handleSubmit}>
      <div className="top">
        <UserProfile />
        <SelectMedias
          onMediaSelected={(selectedFiles) => {
            addFiles(selectedFiles);
          }}
        />
      </div>

      <div className="inputs__and__data">
        <div className="wrap__input">
          {/* <label htmlFor="description"></label> */}
          <textarea
            name="description"
            id="description"
            placeholder="Hey Nzanzu Lwanzo, what's on your mind today ?"
            value={textContent}
            onChange={(event) => setTextContent(event.target.value)}
          ></textarea>
        </div>

        <div
          className={`chosen__medias ${
            files.length > 0 ? "chosen__medias__exist" : null
          }`}
        >
          <ListMedias />
        </div>

        {deviceSupportsBackgroundPeriodicSync && (
          <div className="wrap__input">
            <input
              type="datetime-local"
              name="auto__post__datetime"
              id="auto__post__datetime"
              onChange={(e) => {
                setAutoPostDateTime(e.target.value);
                e.target.value == "";
              }}
            />
          </div>
        )}
      </div>

      <div className="submitters">
        <button type="submit" className="post__a__feed">
          {isPending ? (
            <Loader height={20} width={20} />
          ) : (
            <>
              <span>Post Now</span>
              <span className="icon">
                <Newspaper size={20} />
              </span>
            </>
          )}
        </button>

        {deviceSupportsBackgroundPeriodicSync && (
          <button type="button" className="post__a__feed" onClick={handleDraft}>
            <span>Plan a post</span>
            <span className="icon">
              <Calendar size={20} />
            </span>
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
