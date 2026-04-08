import React, { useState } from "react";
import uploadApi from "../api/uploadApi";
import api from "../api/api.json";
import { toast } from "react-toastify";
import { useGetApi } from "../api/useGetApi";
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";
import { editApi } from "../api/editApi";


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

    // =====================
    // Acccess DB 
    // ======================


    const db = "adslink";
    const { jsonData: adslink } = useGetApi(db)

    // Api managemant
    const path = "uploads/";
    const server = api.baseUrl + path;
    const handelvislue = (data) => {
      //  alert(JSON.stringify(data))
        editApi(data)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "success") {
                    toast.success("Item edited successfully!");
                    window.location.reload();
                } else {
                    toast.error(res);
                }
                toast.error(res);
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while editing the item.");
            });
    }

    return (
        <>
            <div className="flex center column w100 gap20">
                <div className="bar">
                    only enebal 10 image
                </div>
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
                <div className="flex center medel">
                    <div class="table-container">
                        <table className="table animate__animated animate__fadeIn">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Photo</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adslink.map(item => (
                                        <tr key={item.id}>
                                            <td >{item.id}</td>
                                            <td>
                                                <img src={
                                                    server + item.imgname
                                                } alt="" className="tableImg" />
                                            </td>
                                            <td>
                                                {item.is_visible === 1 ? (
                                                    <LiaToggleOnSolid onClick={() => item.is_visible === 1 ? handelvislue({ table: db, data: { data: { id: item.id, is_visible: "2" } } }) : handelvislue({ table: db, data: { id: item.id, is_visible: "1" } })} className="swIcon swTrue" />
                                                ) : (
                                                    <LiaToggleOffSolid onClick={() => item.is_visible === 2 ? handelvislue({ table: db, data: { data: { id: item.id, is_visible: "1" } } }) : handelvislue({ table: db, data: { id: item.id, is_visible: "2" } })} className="swIcon swTrue" />
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}