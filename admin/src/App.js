import React from "react";
import Nav from "./components/ui/Nav";
import SideBar from "./components/ui/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";


function App() {
  return (
    <Router>
      <Nav />
      <div className="flex">
        <div>
          <SideBar /> 
        </div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/subcategory" element={<h1>Sub Category</h1>} />
          </Routes>
        </div>
      </div>

    </Router>
  );
}

export default App;
