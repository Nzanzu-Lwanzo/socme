import { useState } from "react";

const FeedImages = () => {
  let [loadImageError, setLoadImageError] = useState(false);

  return (
    <div className="image">
      {!loadImageError ? (
        <img
          src="https://media.gettyimages.com/id/1372615092/fr/photo/une-adolescente-boulevers%C3%A9e-parle-d%C3%A9motions-pendant-la-s%C3%A9ance-de-th%C3%A9rapie.jpg?s=612x612&w=0&k=20&c=ELtpTm7QRrWTtqM7bI7E2X0IADLR4ql2KrHw6CF3ZHE="
          alt="Image de Che Guevara"
          onError={() => {
            setLoadImageError(true);
          }}
        />
      ) : (
        <div className="load__image__error">Image non chargée</div>
      )}
    </div>
  );
};

export default FeedImages;
