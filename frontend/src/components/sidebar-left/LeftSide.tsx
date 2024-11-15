import BottomActions from "./_components/BottomActions";
import Form from "../feed/_feedForm/Form";
import FilterAndSearch from "./_components/FilterAndSearch";
import { FilterAndSearchContextProvider } from "../../contexts/FilterAndSearchContext";

const LeftSide = () => {
  return (
    <div className="left__sidebar">
      <div className="contained">
        <FilterAndSearchContextProvider>
          <FilterAndSearch />
        </FilterAndSearchContextProvider>
        <Form />
        <BottomActions />
      </div>
    </div>
  );
};

export default LeftSide;
