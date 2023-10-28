import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import TryItOut from "./pages/TryItOut";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<TryItOut />} />
      </Routes>
    </Router>
  );
};

export default App;
