import React, { useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import Table from "../components/table/Table";
import { useGetApi } from "../api/useGetApi";

export default function Category() {
    const { jsonData: catagory } = useGetApi("catagory");
    const { jsonData: subCatagory } = useGetApi("subcatagory");

    const [view, setView] = useState("category");

    return (
        <div className="flex center column gap20">

            <div className="bar">
                <button onClick={() => setView("category")}>
                    <TbCategoryPlus /> Category
                </button>

                <button onClick={() => setView("sub")}>
                    <TbCategoryPlus /> Sub Category
                </button>
            </div>

            <div className="w100 flex center">
                {
                    view === "category" && (
                        <Table maxdata={catagory} />
                    )
                }

                {
                    view === "sub" && (
                        <Table maxdata={subCatagory} />
                    )
                }
            </div>

        </div>
    );
}