import React from "react";
import { useGetApi } from "../api/useGetApi";
import api from "../api/api.json";

export default function Product() {
    const { jsonData: product } = useGetApi("products");
    const server = api.baseUrl + "uploads/";
    return (
        <>
            <div className="flex center medel w100">
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
                                            <p><b>Category : </b> test1</p>
                                            <p><b>Sub Category : </b>  test2</p>
                                            <p><b>Old price : </b> 120Bdt</p>
                                            <p><b>Price : </b> 123</p>
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