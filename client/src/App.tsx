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
import loginAPI from "./api/login-api";
// import { LoginCredentials } from "./utils/types";

const MaybeNavbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return !isLanding ? <Navbar /> : null;
};

const App = () => {
  const [user, setUser] = useState<Logged | null>(null);
  // const [token, setToken] = useState("");

  // Get logged user

  useEffect(() => {
    const checkUser = async () => {
      const logged = window.localStorage.getItem("budgetUser");
      if (logged) {
        console.log("logged", logged);
        const budgetUser = JSON.parse(logged);
        try {
          const valid = await loginAPI.validateToken(budgetUser.token);

          console.log("valid", valid);
          if (valid && valid.validUser) {
            setUser(valid.validUser);
            // setToken(valid.token);
          }
        } catch (error: unknown) {
          console.log("sakdlda", error);
        }
      }
    };
    checkUser();
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
        <Route path="budget" element={<Budget user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
