import React, { useState, useEffect } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import Table from "../components/table/Table";
import { useGetApi } from "../api/useGetApi";
import { loading } from "../components/ui/Loadding";
import { toast } from "react-toastify";
import postApi from "../api/postApi";

export default function Category() {
    const { jsonData: catagory = [], loading: loading1 } = useGetApi("catagory");
    const { jsonData: subCatagory = [], loading: loading2, refetch } = useGetApi("subcatagory");

    const loadingif = loading1 || loading2;

    const [view, setView] = useState("category");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [inputData, setInputData] = useState("");
    const [filteredSub, setFilteredSub] = useState([]);

    // ✅ FIX: loading useEffect এ
    useEffect(() => {
        loading(loadingif);
    }, [loadingif]);

    useEffect(() => {
        let filtered = subCatagory || [];

        if (selectedCategory) {
            filtered = filtered.filter(
                (sub) => sub.catagory_id == selectedCategory
            );
        }

        if (inputData) {
            filtered = filtered.filter((sub) =>
                sub.name.toLowerCase().includes(inputData.toLowerCase())
            );
        }

        const mapped = filtered.map((sub) => {
            const category = catagory.find(
                (cat) => cat.id == sub.catagory_id
            );

            return {
                id: sub.id,
                subcategory: sub.name,
                category: `(${category?.id}) ${category?.name || "N/A"}`
            };
        });

        setFilteredSub(mapped);
    }, [selectedCategory, inputData, subCatagory, catagory]);



    
    const subPostPress = async () => {
        if (!selectedCategory) {
            toast.error("Please select a category first.");
            return;
        }

        if (!inputData.trim()) {
            toast.error("Subcategory name cannot be empty.");
            return;
        }

        const thisData = {
            catagory_id: Number(selectedCategory),
            name: inputData.trim()
        };
        postApi({ table: "subcatagory", data: thisData })
            .then(res => {
                if (!res.ok) throw new Error("Server Error " + res.status);
                return res.json();
            })
            .then(res => {
                if (res.error) {
                    toast.error("Error: " + res.error);
                } else {
                    toast.success(res.message);
                    setInputData("");
                    refetch();
                }
            }
            )
            .catch(err => console.log(err));
    };



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
                    <div className="w100 flex center column">
                        <div className="flex center">
                            <input type="text" className="input" placeholder="Search Category..." />
                        </div>
                        <div className="w100 flex gap20 ">
                            <Table maxdata={catagory} />
                        </div>
                    </div>
                )}

                {view === "sub" && (
                    <div className="w100 flex center column">
                        <div className="w100 flex center">
                            <div className="flex gap10">

                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="input"
                                >
                                    <option value="">All Category</option>

                                    {catagory.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Search Sub Category..."
                                    value={inputData}
                                    onChange={(e) =>
                                        setInputData(e.target.value)
                                    }
                                />

                                <div className="flex center medel">
                                    <button onClick={subPostPress} className="btn margin">
                                        <TbCategoryPlus /> Add Sub Category
                                    </button>
                                </div>

                            </div>
                        </div>

                        <Table maxdata={filteredSub}  action={{delete:{tab:"subcatagory"} , edit:{tab:"subcatagory"}}}/>
                    </div>
                )}
            </div>
        </div>
    );
}