import React from "react";
import ImagesSliders from "../components/Home/ImagesSliders";
import Poduct from "../components/poduct/Poduct";

export default function Home() {
    return (
        <>
            <ImagesSliders />
            <br /><br />
            <div className="flex center medel">
              <span className="title">
                Poducts
              </span>
            </div>
            <Poduct />
        </>
    )
}