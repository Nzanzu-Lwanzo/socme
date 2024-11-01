import UserProfile from "../../cross-app/UserProfile";
import { ImagePlus, Clapperboard, Newspaper, Calendar } from "lucide-react";
import ImageChosen from "../_components/ChosenMediaElt";

const Form = () => {
  const chosenMedias = [1];

  return (
    <form action="#" method="post" id="new__post__form">
      <div className="top">
        <UserProfile />
        <div className="buttons">
          <button type="button">
            <Clapperboard size={20} />
          </button>
          <button type="button">
            <ImagePlus size={20} />
          </button>
        </div>
      </div>

      <div className="wrap__input">
        {/* <label htmlFor="description"></label> */}
        <textarea
          name="description"
          id="description"
          placeholder="Hey Nzanzu Lwanzo, what's on your mind today ?"
        ></textarea>
      </div>

      <div
        className={`chosen__medias ${
          chosenMedias.length > 0 ? "chosen__medias__exist" : null
        }`}
      >
        <ImageChosen />
        <ImageChosen />
      </div>
      <div className="submitters">
        <button type="submit" className="post__a__feed">
          <span>Post a feed</span>
          <span className="icon">
            <Newspaper size={20} />
          </span>
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
