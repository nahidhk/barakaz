import React, { useState, useEffect } from "react";

export default function ImagesSliders() {
    const slides = [
        {
            id: 1,
            "url": "https://images.unsplash.com/photo-1590595978583-3967cf17d2ea",
            "call": "url call"
        },
        {
            id: 2,
            "url": "https://images.unsplash.com/photo-1588807308097-fb6e5047df8c",
            "call": "url call"
        },
        {
            id: 3,
            "url": "https://images.unsplash.com/photo-1589808710416-24cf7ac026f2",
            "call": "url call"
        },
        {
            id: 4,
            "url": "https://images.unsplash.com/photo-1588796388882-a4d533c47e5e",
            "call": "url call"
        }
    ];
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