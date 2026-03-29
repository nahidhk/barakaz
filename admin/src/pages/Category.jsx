import React, { useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import Table from "../components/table/Table";
import { useGetApi } from "../api/useGetApi";

export default function Category() {
    const { jsonData: catagory = [] } = useGetApi("catagory");
    const { jsonData: subCatagory = [] } = useGetApi("subcatagory");
    const [view, setView] = useState("category");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredSub, setFilteredSub] = useState([]);

    const handleSelectCategory = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);

        const filtered = subCatagory
            .filter((sub) => sub.catagory_id == value)
            .map((sub) => {
                const category = catagory.find(
                    (cat) => cat.id == sub.catagory_id
                );

                return {
                    id: sub.id,
                    subcategory: sub.name,
                    category: `(${category?.id}) ${category?.name || "N/A"}`,
                };
            });

        setFilteredSub(filtered);
    };

    const subCaterogyData = subCatagory.map((sub) => {
        const category = catagory.find(
            (cat) => cat.id == sub.catagory_id
        );

        return {
            id: sub.id,
            subcategory: sub.name,
            category: `(${category?.id}) ${category?.name || "N/A"}`,
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
                {view === "category" && (
                    <Table maxdata={catagory} />
                )}
                {view === "sub" && (
                    <div className="w100 flex center column">
                        <div className="w100 flex center">
                            <div>
                                <select
                                    value={selectedCategory}
                                    onChange={handleSelectCategory}
                                    className="input"
                                >
                                    <option value="">
                                        All Category
                                    </option>
                                    {catagory.map((cat) => (
                                        <option
                                            key={cat.id}
                                            value={cat.id}
                                        >
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Sub Category"
                                />
                            </div>
                        </div>
                        <Table
                            maxdata={
                                selectedCategory
                                    ? filteredSub
                                    : subCaterogyData
                            }
                        />
                    </div>
                )}
            </div>
        </div>
    );
}