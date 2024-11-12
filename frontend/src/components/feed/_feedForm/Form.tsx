import UserProfile from "../../cross-app/UserProfile";
import { Newspaper, Calendar } from "lucide-react";
import SelectMedias from "./SelectMedias";
import useFeedFormStore from "../../../stores/FeedFormStore";
import ListMedias from "../_components/ListMedias";
import { FormEvent, useState } from "react";
import { usePostAPost } from "../../../hooks/postHooks";
import Loader from "../../cross-app/Loader";

const Form = () => {
  const files = useFeedFormStore((state) => state.files);
  const [textContent, setTextContent] = useState("");
  const { isPending, mutate } = usePostAPost();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const post = new FormData();

    post.append("textContent", textContent);
    files.forEach((file) => {
      post.append("mediaFiles", file.data);
    });

    mutate(post);
  };

  return (
    <form action="#" method="post" id="new__post__form" onSubmit={handleSubmit}>
      <div className="top">
        <UserProfile />
        <SelectMedias />
      </div>

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
      <div className="submitters">
        <button type="submit" className="post__a__feed">
          {isPending ? (
            <Loader height={20} width={20} />
          ) : (
            <>
              <span>Post a feed</span>
              <span className="icon">
                <Newspaper size={20} />
              </span>
            </>
          )}
        </button>
        <button type="button" className="post__a__feed">
          <span>Plan a post</span>
          <span className="icon">
            <Calendar size={20} />
          </span>
        </button>
      </div>
    </form>
  );
};

export default Form;
