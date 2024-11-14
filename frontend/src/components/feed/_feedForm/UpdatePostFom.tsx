import SelectMedias from "./SelectMedias";
import { Newspaper } from "lucide-react";
import Loader from "../../cross-app/Loader";
import useFeedFormStore, { MediaFileType } from "../../../stores/FeedFormStore";
import { useState } from "react";
import PostImageAlreadyOnCloud from "./PostImageAlreadyOnCloud";
import { getMediaEltKey } from "../../../utils/medias";
import ImageChosen from "../_components/ChosenMediaElt";
import { FormEvent } from "react";
import { useUpdatePost } from "../../../hooks/postHooks";
import { PostMediaFileType } from "../../../types/interfaces";

const UpdatePostFom = () => {
  const postToUpdate = useFeedFormStore((state) => state.postToUpdate);
  const [files, setFiles] = useState<MediaFileType[]>([]);
  const [textContent, setTextContent] = useState<string | undefined>(
    postToUpdate?.textContent
  );

  const { mutate, isPending, on_update_post_transition } = useUpdatePost(
    postToUpdate?._id!
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post = new FormData();

    post.append("textContent", textContent!); // Red flag !!!! But works anyway !!!
    files.forEach((file) => {
      post.append("mediaFiles", file.data);
    });

    mutate(post);
  };

  return (
    <form className="update__post__form" onSubmit={handleSubmit}>
      <div className="wrap__input">
        <textarea
          name="description"
          id="description"
          placeholder="Hey Nzanzu Lwanzo, what's on your mind today ?"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        ></textarea>
      </div>
      <SelectMedias
        onMediaSelected={(selectedFiles) => {
          const mediaFiles = selectedFiles
            ? Array.from(selectedFiles).map((file) => {
                return { data: file, id: getMediaEltKey(file) };
              })
            : [];
          setFiles(mediaFiles);
        }}
      />

      {/* Image chosen and to be added */}
      <div
        className={`chosen__medias ${
          files.length > 0 ? "chosen__medias__exist" : null
        }`}
      >
        {files?.map((file) => {
          return (
            <ImageChosen
              file={file}
              key={getMediaEltKey(file.data)}
              removeFile={(id) => {
                setFiles((prev) => {
                  return prev.filter(
                    (file) => getMediaEltKey(file.data) !== id
                  );
                });
              }}
            />
          );
        })}
      </div>

      {/* Already on post images */}
      <div
        className={`chosen__medias ${
          postToUpdate?.mediaFiles && postToUpdate.mediaFiles.length > 0
            ? "chosen__medias__exist"
            : null
        }`}
      >
        {postToUpdate?.mediaFiles.map((file) => {
          return (
            <PostImageAlreadyOnCloud
              key={(file as PostMediaFileType).public_id}
              file={file as PostMediaFileType}
              postId={postToUpdate._id}
            />
          );
        })}
      </div>

      <button type="submit" className="post__a__feed">
        {isPending || on_update_post_transition ? (
          <Loader height={20} width={20} />
        ) : (
          <>
            <span>Update</span>
            <span className="icon">
              <Newspaper size={20} />
            </span>
          </>
        )}
      </button>
    </form>
  );
};

export default UpdatePostFom;
