import { type MediaFileType } from "../../stores/FeedFormStore";
import {
  formatDate,
  postMessageToWorker,
} from "../../utils/handlersAndFormatters";
import ImageChosen from "../feed/_components/ChosenMediaElt";
import { X, Edit, Upload } from "lucide-react";
import { type DraftPostType } from "../../types/interfaces";

const DraftCard = ({ post }: { post: DraftPostType }) => {
  return (
    <div className="draft__card">
      <div className="top">
        <span className="auto__posted">
          {formatDate(post.autoPostDateTime)}
        </span>
        <div className="actions">
          <button
            className="action"
            type="button"
            onClick={() => {
              postMessageToWorker({ action: "DELETE", req_data: post.id });
            }}
          >
            <X size={18} stroke="#000" />
          </button>
          <button className="action" type="button">
            <Edit size={18} stroke="#000" />
          </button>
          <button
            className="action"
            type="button"
            onClick={() => {
              postMessageToWorker({ action: "UPLOAD", req_data: post.id });
            }}
          >
            <Upload size={18} stroke="#000" />
          </button>
        </div>
      </div>
      <div className="textContent">
        <p>{post.textContent}</p>
      </div>
      <div className={`images ${post.mediaFiles.length > 1 ? "many" : "one"}`}>
        {post.mediaFiles.map((file) => {
          const mediaFile = file as unknown as MediaFileType;
          return <ImageChosen key={mediaFile.id} file={mediaFile} />;
        })}
      </div>
    </div>
  );
};

export default DraftCard;
