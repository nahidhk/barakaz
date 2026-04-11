import React from "react";
import { useGetApi } from "../api/useGetApi";


export default function Product() {
    const { jsonData: product } = useGetApi("products")
    return (
        <>
            <div className="flex center medel w100">
                <div className="flex center medel">
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
                                        Product Name
                                    </th>
                                    <th>
                                        Categore
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.map(item =>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td></td>
                                            <td>{item.products_name}</td>
                                            <td></td>
                                        </tr>

                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}