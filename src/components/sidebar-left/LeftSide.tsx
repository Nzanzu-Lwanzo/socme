import { COLOR_SCHEMA } from "../../utils/constants";
import Form from "../feed/_feedForm/Form";
import FilterAndSearch from "./_components/FilterAndSearch";
import { LogOut, Settings } from "lucide-react";

const LeftSide = () => {
  return (
    <div className="left__sidebar">
      <div className="contained">
        <FilterAndSearch />
        <Form />
        <div className="gen__actions">
          <button type="button" className="log__out">
            <Settings size={20} stroke={COLOR_SCHEMA.white} />
          </button>
          <button type="button" className="log__out">
            <LogOut size={20} stroke={COLOR_SCHEMA.white} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
