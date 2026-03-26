import React from "react";
import { TbBrandMercedes } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";

import { useNavigate } from "react-router-dom";

export default function SideBar() {
    const navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate("/");
    };

    const handleCategoryClick = () => {
        navigate("/category");
    };

    const handleSubCategoryClick = () => {
        navigate("/subcategory");
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
            </div>
        </>
    )
}