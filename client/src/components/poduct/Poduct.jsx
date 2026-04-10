import React from "react";
import { FaRegHeart } from "react-icons/fa";


export default function Poduct() {
    return (
        <div className="flex center medel">
            <div className="card flex column">
              <div>
                  <img className="product" src="https://img.drz.lazcdn.com/static/bd/p/d158810e5e631b7485d78018b961dde6.jpg_720x720q80.jpg_.webp" alt="Products" />
              </div>
                <div className="poduct_info">
                    <div className="flex beet medel">
                        <span className="p_title">
                            Hello Wlord!
                        </span>
                        <div className="lovIcon flex center medel pointer">
                            <FaRegHeart />
                        </div>
                    </div>
                    <div className="flex medel around gap20 price">
                        <div>
                            150 BDT
                        </div>
                        <div className="flex medel">
                            <div className="status in"></div>
                            <div>
                                In Stock
                            </div>
                        </div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nam perspiciatis quia perferendis dolor ducimus tenetur maiores natus velit pariatur quam expedita maxime optio, sit consequuntur, placeat hic consequatur nemo?
                    </p>
                </div>
            </div>
        </div>
    )
}