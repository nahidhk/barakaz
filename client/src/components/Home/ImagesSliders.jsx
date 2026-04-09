import React, { useState, useEffect } from "react";
import { useGetApi } from "../../api/useGetApi";
import api from "../../api/api.json";
import { loading } from "../web/Lodding"

export default function ImagesSliders() {
    const { jsonData: imgData = [] , loading : xi} = useGetApi("adslink");
    const slides = imgData.filter(img => img.is_visible === 1);
    const [currentSlide, setCurrentSlide] = useState(0);

    loading(xi);

    useEffect(() => {
        
        if (slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide(prev =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [slides]);

    const next = () => {
        if (slides.length === 0) return;

        setCurrentSlide(
            currentSlide === slides.length - 1 ? 0 : currentSlide + 1
        );
    };

 
    const prev = () => {
        if (slides.length === 0) return;

        setCurrentSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1
        );
    };

   
    if (slides.length === 0) {
        return <p style={{ textAlign: "center" }}>Loadding.......</p>;
    }

    return (
        <>
            <div className="slide-container">
                {slides.map((img, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? "active" : ""}`}
                    >
                        <img
                            src={api.baseUrl + "uploads/" + img.imgname}
                            alt=""
                        />
                    </div>
                ))}

                <button className="prev" onClick={prev}>❮</button>
                <button className="next" onClick={next}>❯</button>
            </div>

            <div className="dots-container">
                {slides.map((_, i) => (
                    <span
                        key={i}
                        className={`dot ${i === currentSlide ? "active" : ""}`}
                        onClick={() => setCurrentSlide(i)}
                    ></span>
                ))}
            </div>
        </>
    );
}