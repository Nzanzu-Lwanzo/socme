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
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import NewPost from "./pages/NewPost";
import { AppContectProvider } from "./contexts/AppContext";
import Page404 from "./pages/404";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 10 * 60 * 1000,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  const { auth } = useAppStore();

  return (
    <QueryClientProvider client={client}>
      <SnackbarProvider maxSnack={4}>
        <Router>
          <AppContectProvider>
            <Routes>
              <Route
                path="/"
                element={auth ? <Main /> : <Navigate to="/auth/login" />}
              />
              <Route
                path="/profile"
                element={auth ? <Profile /> : <Navigate to="/auth/login" />}
              />
              <Route
                path="/settings"
                element={auth ? <Settings /> : <Navigate to="/auth/login" />}
              />
              <Route
                path="/notifications"
                element={
                  auth ? <Notifications /> : <Navigate to="/auth/login" />
                }
              />
              <Route
                path="/add-post"
                element={auth ? <NewPost /> : <Navigate to="/auth/login" />}
              />
              <Route path="/auth/signup" Component={Signup} />
              <Route path="/auth/login" Component={Login} />
              <Route path="*" Component={Page404} />
            </Routes>
          </AppContectProvider>
        </Router>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
