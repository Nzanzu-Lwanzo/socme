import Feed from "../components/feed/Feed";
import RightSide from "../components/sidebar-right/RightSide";
import LeftSide from "../components/sidebar-left/LeftSide";
import "../assets/style/perPage/main.scss";
import Modal from "../components/cross-app/Modal";
import NavBar from "../components/cross-app/NavBar";

const Main = () => {
  return (
    <>
      <NavBar />
      <main className="main__page">
        <LeftSide />
        <Feed />
        <RightSide />
        <Modal />
      </main>
    </>
  );
};

export default Main;
