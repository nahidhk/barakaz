import React from "react";
import { TbBrandMercedes } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { TfiGallery } from "react-icons/tfi";

import { useNavigate } from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate("/");
    };

    const handleCategoryClick = () => {
        navigate("/category");
    };

    return (
        <>
            <div className="sideBar">
                <button className="sidebar-button" onClick={handleDashboardClick}>
                    <TbBrandMercedes className="icon" />  Dashboard
                </button>
                <button className="sidebar-button" onClick={handleCategoryClick}>
                    <MdOutlineCategory className="icon" />  Category
                </button>
                <button className="sidebar-button" onClick={() => navigate("/product-ads")}>
                    <TfiGallery className="icon" />  Product Ads
                </button>
            </div>
        </>
    )
}