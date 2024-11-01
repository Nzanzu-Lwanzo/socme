import "./assets/style/App.scss";
import Main from "./pages/main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Login from "./pages/login";
import useAppStore from "./stores/AppStore";
import { fbAuth } from "./firebase/config";

function App() {
  const auth = fbAuth.currentUser || useAppStore((state) => state.auth) || true;

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={auth ? <Main /> : <Navigate to="/auth/login" />}
          />
          <Route
            path="/profile"
            element={auth ? <Profile /> : <Navigate to="/auth/login" />}
          />
          <Route path="/auth/signup" Component={Signup} />
          <Route path="/auth/login" Component={Login} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
