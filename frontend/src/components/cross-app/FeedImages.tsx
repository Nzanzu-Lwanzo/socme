import FeedImage from "./FeedImage";

const FeedImages = ({ images }: { images: string[] }) => {
  return (
    <div className={`images ${images.length > 1 ? "many" : null}`}>
      {images.map((image) => {
        return <FeedImage key={image} image={image} />;
      })}
    </div>
  );
};

export default FeedImages;
