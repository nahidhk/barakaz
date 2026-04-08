import React, { useState, useEffect } from "react";
import { useGetApi } from "../../api/useGetApi";
import api from "../../api/api.json";

export default function ImagesSliders() {
    const { jsonData: imgData } = useGetApi("adslink");
    const slides = imgData.map(item => (
        {
            id: item.id,
            url: api.baseUrl+'uploads/'+item.imgname
        }
    ))
    const [currentSlide, setCurrentSlide] = useState(0);
    // auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev =>
                prev === slides.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);
    const next = () => {
        setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    };
    const prev = () => {
        setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    };
    return (
        <>
            <div className="slide-container">
                {
                    slides.map((img, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? "active" : ""}`}
                        >
                            <img src={img.url} alt="" />
                        </div>
                    ))
                }
                <button className="prev" onClick={prev}>❮</button>
                <button className="next" onClick={next}>❯</button>
            </div>
            <div className="dots-container">
                {
                    slides.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === currentSlide ? "active" : ""}`}
                            onClick={() => setCurrentSlide(i)}
                        ></span>
                    ))
                }
            </div>
        </>
    );
}