import React, { use, useEffect, useState } from "react";
import { useGetApi } from "../api/useGetApi";
import api from "../api/api.json";
import { loading } from "../components/ui/Loadding";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function Product() {
    const { jsonData: product, loading: l1 } = useGetApi("products");
    const { jsonData: catege, loading: l2 } = useGetApi("catagory");
    const { jsonData: subC, loading: l3 } = useGetApi("subcatagory");
    const load = l1 || l2 || l3;
    useEffect(() => {
        loading(load);
    }, [load])
    const server = api.baseUrl + "uploads/";
    const [cateData, setCateData] = useState("")
    return (
        <>
            <div className="flex center medel w100 column">
                <div className="flex center medel">
                    <select onChange={(e) => setCateData(e.target.value)} className="input">
                        <option selected disabled value="">Select Catagory</option>
                        {
                            catege.map(cate => (
                                <option value={cate.id} key={cate.id}>{cate.name}</option>
                            ))
                        }
                    </select>
                    <select className="input">
                        <option selected disabled value="">Select Sub Catagory</option>
                        {
                            subC.map(item => (
                                <option key={item.id}>{subC.filter(catei => catei.catagory_id === cateData)?.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    Product Images
                                </th>
                                <th>
                                    Product Info
                                </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.map(item =>
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>
                                            <img className="tableImg" src={server + item.products_image} />
                                        </td>
                                        <td>
                                            <p><b>Name :</b> {item.products_name}</p>
                                            <p><b>Category : </b> {catege.find(cat => cat.id === item.products_category_id)?.name} </p>
                                            <p><b>Sub Category : </b>{subC.find(sub => sub.id === item.products_subcategory_id)?.name}</p>
                                            <p><b>Old price : </b>৳{item.products_old_price}</p>
                                            <p><b>Price : </b>৳{item.products_new_price}</p>
                                        </td>
                                        <td>
                                            <div className="flex center medel">
                                                <button className="iconBtn">
                                                    <CiEdit />
                                                </button>
                                                <button className="iconBtn delete">
                                                    <MdDeleteOutline />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}