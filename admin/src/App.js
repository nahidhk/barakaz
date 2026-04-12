import React from "react";
import 'animate.css';
import Nav from "./components/ui/Nav";
import SideBar from "./components/ui/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Loading from "./components/ui/Loadding";
import ImageSlider from "./pages/ImageSlider";
import Toast from "./components/package/Tosta";
import Product from "./pages/Product";


function App() {
  return (
    <Router>
      <Nav />
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div className="w100">
          <Loading />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product-ads" element={<ImageSlider />} />
            <Route path="/product" element={<Product />} />
          </Routes>
          
          <Toast />
        </div>
      </div>

    </Router>
  );
}

export default App;
