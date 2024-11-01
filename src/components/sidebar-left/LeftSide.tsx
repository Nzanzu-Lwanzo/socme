import BottomActions from "./_components/BottomActions";
import Form from "../feed/_feedForm/Form";
import FilterAndSearch from "./_components/FilterAndSearch";

const LeftSide = () => {
  return (
    <div className="left__sidebar">
      <div className="contained">
        <FilterAndSearch />
        <Form />
        <BottomActions />
      </div>
    </div>
  );
};

export default LeftSide;
