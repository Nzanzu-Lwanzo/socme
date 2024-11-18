import { useEffect } from "react";
import { postMessageToWorker } from "../utils/handlersAndFormatters";
import DraftCard from "../components/draft/DraftCard";
import "../assets/style/perPage/draft.scss";
import MobilePagesSubTopBar from "../components/cross-app/MobilePagesSubTopBar";
import useFeedFormStore, { type MediaFileType } from "../stores/FeedFormStore";
import { usePostAPost } from "../hooks/postHooks";
import { type DraftPostType } from "../types/interfaces";

const Draft = () => {
  const { mutate } = usePostAPost(() => {
    // Successfully posted
    // Delete from the indexedDB
  });

  const { addDraftPosts, draftPosts, delteDraftPost } = useFeedFormStore();

  useEffect(() => {
    postMessageToWorker({ action: "GET_ALL" });

    navigator.serviceWorker.addEventListener("message", ({ data }) => {
      switch (data.action) {
        case "GET_ALL":
          addDraftPosts(data.posts);
          break;

        case "DELETE":
          delteDraftPost(data.id);
          break;

        case "UPLOAD": {
          const draftPost = data.post;
          const formData = new FormData();
          formData.append("textContent", draftPost.textContent);
          (draftPost.mediaFiles as MediaFileType[]).forEach((file) => {
            formData.append("mediaFiles", file.data);
          });

          // Post to the server
          mutate(formData);

          // Remove from the state
          delteDraftPost(data.post.id);
        }
      }
    });
  }, []);

  return (
    <main className="draft__page">
      <MobilePagesSubTopBar title="Draft" />
      <div className="container">
        {draftPosts.map((post) => {
          return <DraftCard post={post as DraftPostType} key={post.id} />;
        })}
      </div>
    </main>
  );
};

export default Draft;
