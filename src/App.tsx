import "./assets/style/App.scss";
import Main from "./pages/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/cross-app/NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/profile" Component={Main} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
