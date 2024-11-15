import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navs from "./components/Navs";
import About from "./pages/About";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Navs />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
