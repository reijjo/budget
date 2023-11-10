import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import userAPI from "./api/users-api";

import Landing from "./pages/Landing";
import TryItOut from "./pages/TryItOut";
import Budget from "./pages/Budget";
import Navbar from "./components/common/Navbar";
import { useEffect, useState } from "react";
import { Logged } from "./utils/types";
import Unauthorized from "./pages/Unauthorized";
// import { LoginCredentials } from "./utils/types";

const MaybeNavbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/" || location.pathname === "/fake";

  return !isLanding ? <Navbar /> : null;
};

const App = () => {
  const [user, setUser] = useState<Logged | null>(null);

  // Get logged user

  useEffect(() => {
    const logged = window.localStorage.getItem("budgetUser");
    if (logged) {
      const user = JSON.parse(logged);
      setUser(user);
    }
  }, [setUser]);

  // Get all users just for fun

  useEffect(() => {
    const getAllUsers = async () => {
      const users = await userAPI.allUsers();
      console.log("users", users);
    };
    getAllUsers();
  }, []);

  console.log("User", user);
  // Return

  return (
    <Router>
      <MaybeNavbar />
      <Routes>
        <Route path="/" element={<Landing setUser={setUser} />} />
        <Route path="/test" element={<TryItOut />} />
        <Route
          path="/budget"
          element={<Budget setUser={setUser} user={user} />}
        />
        <Route path="/fake" element={<Unauthorized />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
