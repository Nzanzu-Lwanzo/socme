import UserProfile from "../../cross-app/UserProfile";
import { XCircle, ThumbsUp } from "lucide-react";

const NewFeedNotif = () => {
  return (
    <li className="new__post__notif">
      <div className="notif__top">
        <UserProfile />
        <div className="actions">
          <span className="cell">New</span>
          <button type="button" className="icon">
            <ThumbsUp size={18} />
          </button>
          <button type="button" className="icon">
            <XCircle size={18} />
          </button>
        </div>
      </div>
      <div className="image">
        <img
          src="https://media.gettyimages.com/id/1425935621/fr/photo/cheerful-young-adult-black-hispanic-latin-man-having-fun-using-smart-mobile-phone-sitting.jpg?s=612x612&w=0&k=20&c=-_J9Jq18Tm_QkLlvWvPfqdVIbfTBrsNE3z7uvT1sBWk="
          alt="Feed image"
        />
      </div>
      {/* <div className="description">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          ipsum labore deserunt voluptatem illum ut deleniti nobis harum, sunt
          debitis quo, architecto et odio dolorum facere eaque impedit expedita
          minus.
        </p>
      </div> */}
    </li>
  );
};

export default NewFeedNotif;
