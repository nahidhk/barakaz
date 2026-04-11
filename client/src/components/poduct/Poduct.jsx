import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { useGetApi } from "../../api/useGetApi";
import { BsChevronCompactRight } from "react-icons/bs";
import api from "../../api/api.json"


export default function Poduct() {

    const { jsonData: catagory, loading: loading1 } = useGetApi("catagory");
    const { jsonData: subCatagory, loading: loading2 } = useGetApi("subcatagory");
    const { jsonData: products, loading: loading3 } = useGetApi("products");
    const server = api.baseUrl+"uploads/";

    return (
        <div className="container">
            {
                products.map(item => (
                    <div key={item.id} className="card">
                        <div className="card-badge">
                            {item.products_badge}
                        </div>
                        <div className="card-wishlist flex medel center">
                            <FaRegHeart />
                        </div>
                        <div className="card-image" style={{ backgroundImage: `url("${server+item.products_image}")` }} />
                        <div className="card-content">
                            <p className="card-category flex center medel">
                                {
                                    catagory.find(cat => cat.id === item.products_category_id)?.name || "loadding...."
                                }
                                <BsChevronCompactRight />
                                <span className="subCateg">
                                    {
                                        subCatagory.find(sub => sub.id === item.products_subcategory_id)?.name
                                    }
                                </span>
                            </p>
                            <h2 className="card-title">
                                {item.products_name}
                            </h2>
                            <div className="card-price">
                                <span className="old-price">
                                    ${item.products_old_price}
                                </span>
                                ${item.products_old_price}
                            </div>
                            <a href="#" className="card-btn">Buy Now</a>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}