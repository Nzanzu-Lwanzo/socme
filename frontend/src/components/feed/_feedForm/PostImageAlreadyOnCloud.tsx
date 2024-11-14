import { useDeleteCloudImage } from "../../../hooks/postHooks";
import { PostMediaFileType } from "../../../types/interfaces";
import { Trash2 } from "lucide-react";
import Loader from "../../cross-app/Loader";

const PostImageAlreadyOnCloud = ({
  file,
  postId,
}: {
  file: PostMediaFileType;
  postId: string;
}) => {
  const { requestDeletion, status } = useDeleteCloudImage();

  return (
    <div className="post__image__already__on__cloud">
      <img src={file.url} alt="Post image" />
      <div className="blur">
        <button
          type="button"
          className="delete__image"
          onClick={() => requestDeletion(postId, file.public_id)}
        >
          {status === "pending" ? (
            <Loader height={18} width={18} />
          ) : (
            <Trash2 size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PostImageAlreadyOnCloud;
