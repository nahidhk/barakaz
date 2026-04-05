import React from "react";



export default function ImageSlider() {
    return (
        <>
            <div className="flex center">
                <div className="flex center medel">
                    <div>
                        <input type="file" className="input"  placeholder="Select File"/>
                        <button className="btn">
                            Uploads
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}