import { useState } from "react";
import Loader from "./Loader";

const FeedImage = ({ image }: { image: string }) => {
  let [imageState, setImageState] = useState<
    "success" | "error" | "loading" | "stable"
  >("success");

  return (
    <>
      {imageState === "success" ? (
        <img
          src={image}
          alt="Image de Che Guevara"
          onError={() => {
            setImageState("error");
          }}
          onLoad={() => setImageState("success")} // This is not working
        />
      ) : imageState === "loading" ? (
        <Loader height={25} width={25} />
      ) : imageState === "error" ? (
        <div className="load__image__error">Image non chargée</div>
      ) : null}
    </>
  );
};

export default FeedImage;
