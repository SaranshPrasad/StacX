
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Auth from "./pages/Auth";
import AdminPanel from "./Admin/AdminPanel";

import HomeLayout from "./pages/HomeLayout";

import HomePage from "./pages/HomePage";
import Resources from "./pages/Resources";
import Chat from "./pages/Chat";
import Requests from "./pages/Requests";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/auth" element={<Auth />} />

        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/home" element={<HomeLayout />}>

          <Route index element={<HomePage />} />

          <Route
            path="resources"
            element={<Resources />}
          />

          <Route
            path="chat"
            element={<Chat />}
          />

          <Route
            path="myrequests"
            element={<Requests />}
          />

          <Route
            path="notifications"
            element={<Notifications />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>

        <Route
          path="*"
          element={<Navigate to="/home" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;