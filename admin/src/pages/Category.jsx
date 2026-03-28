import React, { useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import Table from "../components/table/Table";
import { useGetApi } from "../api/useGetApi";

export default function Category() {


    const { jsonData: catagory = [] } = useGetApi("catagory");
    const { jsonData: subCatagory = [] } = useGetApi("subcatagory");

    const [view, setView] = useState("category");


    const subCaterogyData = subCatagory.map((sub) => {
        const category = catagory.find((cat) => cat.id === sub.catagory_id);

        return {
            id: sub.id,
            category: category?.name || "N/A",
            subcategory: sub.name
        };
    });

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
                        <div className="w100 flex center column">



                            <div className="w100 flex center">
                                <div>
                                    <select className="input">
                                        {
                                            catagory.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <Table maxdata={subCaterogyData} />

                        </div>
                    )
                }
            </div>
        </div>
    );
}