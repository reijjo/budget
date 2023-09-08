// import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Basic from "./components/Basic";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Basic />} />
      </Routes>
    </Router>
  );
};

export default App;
