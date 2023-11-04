import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Landing from "./pages/Landing";
import TryItOut from "./pages/TryItOut";
import Navbar from "./components/common/Navbar";

const MaybeNavbar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return !isLanding ? <Navbar /> : null;
};

const App = () => {
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
