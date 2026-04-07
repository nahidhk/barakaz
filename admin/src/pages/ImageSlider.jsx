import React, { useState } from "react";
import uploadApi from "../api/uploadApi";
import api from "../api/api.json";
import { toast } from "react-toastify";


export default function ImageSlider() {
    const [uploadimage, setuploadImg] = useState(null);
    const [handelImg, setHandelimg] = useState(null);

 const uploads = async () => {
    if (!uploadimage) return alert("Select a file");

    const formData = new FormData();
    formData.append("type", "upload");
    formData.append("table", "adslink"); 
    formData.append("key", api.apikey);
    formData.append("file", uploadimage);

    const res = await uploadApi(formData);
    if (res.status === "success") {
        toast.success("uoload Success");
        window.location.reload();
    }
    
};

    return (
        <>
            <div className="flex center">
                <div className="flex center medel">
                    <div>
                        <input
                            onChange={(e) => setuploadImg(e.target.files[0])}
                            type="file"
                            className="input"
                        />
                        <button onClick={uploads} className="btn">
                            Uploads
                        </button>
                    </div>

                    {handelImg && (
                        <img src={handelImg} alt="preview" width="200" />
                    )}
                </div>
            </div>
        </>
    );
}