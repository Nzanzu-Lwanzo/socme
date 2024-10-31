import Feed from "../components/feed/Feed";
import RightSide from "../components/sidebar-right/RightSide";
import LeftSide from "../components/sidebar-left/LeftSide";
import "../assets/style/perPage/main.scss";

const Main = () => {
  return (
    <main className="main__page">
      <LeftSide />
      <Feed />
      <RightSide />
    </main>
  );
};

export default Main;
