import { XCircle } from "lucide-react";
import { COLOR_SCHEMA } from "../../../utils/constants";

const ImageChosen = () => {

  return (
    <div className="media__container">
      <img
        src="https://media.gettyimages.com/id/1434485884/fr/photo/un-groupe-multiethnique-de-personnes-prend-un-selfie-ensemble-lors-dun-d%C3%AEner.jpg?s=612x612&w=0&k=20&c=jDf85a48uG_Htx3vDt5qoloKFIiMQ3P0DJt5AGBziJk="
        alt="#"
      />
      <div className={`blur`}>
        <button type="button" className="remove__media">
          <XCircle stroke={COLOR_SCHEMA.white} size={20} />
        </button>
      </div>
    </div>
  );
};

export default ImageChosen;
