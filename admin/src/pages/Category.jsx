import React, { useState, useEffect } from "react";
import { TbCategoryPlus } from "react-icons/tb";
import Table from "../components/table/Table";
import { useGetApi } from "../api/useGetApi";
import { loading } from "../components/ui/Loadding";
import { toast } from "react-toastify";
import postApi from "../api/postApi";
import formatDate from "../components/scripts/formatDate";

export default function Category() {

    const { jsonData: catagory = [], loading: loading1, refetch: refetchCat } = useGetApi("catagory");
    const { jsonData: subCatagory = [], loading: loading2, refetch } = useGetApi("subcatagory");

    const loadingif = loading1 || loading2;

    const [view, setView] = useState("category");

    // ✅ Category
    const [catagoryData, setcatagoryData] = useState("");
    const [filteredCategory, setFilteredCategory] = useState([]);

    // ✅ SubCategory
    const [selectedCategory, setSelectedCategory] = useState("");
    const [inputData, setInputData] = useState("");
    const [filteredSub, setFilteredSub] = useState([]);

    // =========================
    // ✅ Loading
    // =========================
    useEffect(() => {
        loading(loadingif);
    }, [loadingif]);

    // =========================
    // ✅ Category Filter
    // =========================
    useEffect(() => {
        let filtered = catagory;

        if (catagoryData) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(catagoryData.toLowerCase())
            );
        }

        const mapped = filtered.map((item) => ({
            id: item.id,
            name: item.name,
            created_at: formatDate(item.created_at)
        }));

        setFilteredCategory(mapped);
    }, [catagoryData, catagory]);

    // =========================
    // ✅ SubCategory Filter
    // =========================
    useEffect(() => {
        let filtered = subCatagory;

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
                category: `(${category?.id}) ${category?.name || "N/A"}`,
                create: formatDate(sub.created_at)
            };
        });

        setFilteredSub(mapped);
    }, [selectedCategory, inputData, subCatagory, catagory]);

    // =========================
    // ✅ Add OR Search Category
    // =========================
    const handleCategory = () => {
        const name = catagoryData.trim();

        if (!name) {
            toast.error("Category name required");
            return;
        }

        // check exists
        const exists = catagory.find(
            (item) => item.name.toLowerCase() === name.toLowerCase()
        );

        if (exists) {
            toast.info("Category already exists");
            return;
        }

        // add new
        postApi({
            table: "catagory",
            data: { name }
        })
            .then(res => {
                if (!res.ok) throw new Error("Server error");
                return res.json();
            })
            .then(res => {
                if (res.error) {
                    toast.error(res.error);
                } else {
                    toast.success(res.message);
                    setcatagoryData("");
                    refetchCat();
                }
            })
            .catch(err => console.log(err));
    };

    // =========================
    // ✅ Add SubCategory
    // =========================
    const addSubCategory = () => {
        if (!selectedCategory) {
            toast.error("Select category first");
            return;
        }

        if (!inputData.trim()) {
            toast.error("Subcategory name required");
            return;
        }

        postApi({
            table: "subcatagory",
            data: {
                catagory_id: Number(selectedCategory),
                name: inputData.trim()
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Server error");
                return res.json();
            })
            .then(res => {
                if (res.error) {
                    toast.error(res.error);
                } else {
                    toast.success(res.message);
                    setInputData("");
                    refetch();
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex center column gap20">

            {/* 🔥 Top Buttons */}
            <div className="bar">
                <button onClick={() => setView("category")}>
                    <TbCategoryPlus /> Category
                </button>

                <button onClick={() => setView("sub")}>
                    <TbCategoryPlus /> Sub Category
                </button>
            </div>

            {/* ================= CATEGORY ================= */}
            {view === "category" && (
                <div className="w100 flex center column">

                    <div className="flex gap10 medel center w100">

                        <input
                            type="text"
                            className="input"
                            placeholder="Search or Add Category..."
                            value={catagoryData}
                            onChange={(e) => setcatagoryData(e.target.value)}
                        />

                        <button onClick={handleCategory} className="btn">
                            Add
                        </button>

                    </div>

                    <Table
                        maxdata={filteredCategory}
                        action={{ delete: { tab: "catagory" }, edit: { tab: "catagory" } }}
                    />
                </div>
            )}

            {/* ================= SUB CATEGORY ================= */}
            {view === "sub" && (
                <div className="w100 flex center column">

                    <div className="flex gap10 medel center w100">

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
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
                            placeholder="Search / Add SubCategory..."
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />

                        <button onClick={addSubCategory} className="btn">
                            Add Sub
                        </button>

                    </div>

                    <Table
                        maxdata={filteredSub}
                        action={{ delete: { tab: "subcatagory" }, edit: { tab: "subcatagory" } }}
                    />
                </div>
            )}
        </div>
    );
}