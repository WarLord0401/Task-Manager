import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navs from "./components/Navs"; // Import the Navs component for navigation
import About from "./pages/About"; // Import the About page
import Home from "./pages/Home"; // Import the Home page

const App = () => {
  return (
    <Router>
      <Navs /> {/* Navigation component */}
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
