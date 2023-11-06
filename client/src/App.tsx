import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import userAPI from "../api/users-api";

import Landing from "./pages/Landing";
import TryItOut from "./pages/TryItOut";
import Navbar from "./components/common/Navbar";
import { useEffect } from "react";

const MaybeNavbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return !isLanding ? <Navbar /> : null;
};

const App = () => {
  useEffect(() => {
    const getAllUsers = async () => {
      const users = await userAPI.allUsers();
      console.log("users", users);
    };
    getAllUsers();
  }, []);

  return (
    <Router>
      <MaybeNavbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<TryItOut />} />
      </Routes>
    </Router>
  );
};

export default App;
