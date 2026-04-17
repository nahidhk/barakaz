import React from "react";
import loadingImg from "../../../asset/img/lg.gif";
import { FaRegHeart } from "react-icons/fa";
import { BsChevronCompactRight } from "react-icons/bs";

export default function LoadingCard() {
    return (
        <>
            <div className="card">
                <div className="card-badge">
                    ...
                </div>
                <div className="card-wishlist flex medel center">
                    <FaRegHeart />
                </div>
                <div className="card-image" style={{ backgroundImage: `url("${loadingImg}` }} />
                <div className="card-content">
                    <p className="card-category flex center medel">
                        ...
                        <BsChevronCompactRight />
                        <span className="subCateg">
                            ....
                        </span>
                    </p>
                    <h2 className="card-title">
                        ...
                    </h2>
                    <div className="card-price">
                        <span className="old-price">
                            ...
                        </span>
                        ...
                    </div>
                    <a href="#" className="card-btn">...</a>
                </div>
            </div>
            <div className="card">
                <div className="card-badge">
                    ...
                </div>
                <div className="card-wishlist flex medel center">
                    <FaRegHeart />
                </div>
                <div className="card-image" style={{ backgroundImage: `url("${loadingImg}` }} />
                <div className="card-content">
                    <p className="card-category flex center medel">
                        ...
                        <BsChevronCompactRight />
                        <span className="subCateg">
                            ....
                        </span>
                    </p>
                    <h2 className="card-title">
                        ...
                    </h2>
                    <div className="card-price">
                        <span className="old-price">
                            ...
                        </span>
                        ...
                    </div>
                    <a href="#" className="card-btn">...</a>
                </div>
            </div>
            <div className="card">
                <div className="card-badge">
                    ...
                </div>
                <div className="card-wishlist flex medel center">
                    <FaRegHeart />
                </div>
                <div className="card-image" style={{ backgroundImage: `url("${loadingImg}` }} />
                <div className="card-content">
                    <p className="card-category flex center medel">
                        ...
                        <BsChevronCompactRight />
                        <span className="subCateg">
                            ....
                        </span>
                    </p>
                    <h2 className="card-title">
                        ...
                    </h2>
                    <div className="card-price">
                        <span className="old-price">
                            ...
                        </span>
                        ...
                    </div>
                    <a href="#" className="card-btn">...</a>
                </div>
            </div>
        </>
    )
}