import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { dropApi } from "../../api/dropApi";
import { toast } from "react-toastify";
import { editApi } from "../../api/editApi";
import { RiCloseLargeLine } from "react-icons/ri";


const sampuleData = { id: 1, name: "John Doe", email: "john@example.com" };




export default function Table({ maxdata, action }) {
    const [showpopup, setShowPopup] = useState(false);
    const [editData, setEditData] = useState({});
    const notjsonCall = ["created_at", "updated_at"];
    action = action || {};

    if (!maxdata || maxdata.length === 0) {
        return (
            <>
                <div className="error">
                    No data available
                </div>
            </>
        );
    }

    const headers = Object.keys(maxdata[0]);


    const handelDelate = (DataTransfer) => {

        dropApi({ table: DataTransfer.tab, data: { id: DataTransfer.id } })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "success") {
                    alert("Item deleted successfully!");
                    window.location.reload();
                } else {
                    toast.error(res[0].error);
                }
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
                toast.error("An error occurred while deleting the item.");
            });

    }


    const handelEdit = (poiter) => {
        setShowPopup(true);
        setEditData(poiter);
    }

    const handelEditCall = () => {
        const notjsonCall = ["created_at", "updated_at"];
        const coreectJson = Object.keys(editData.data)
            .filter(key => !notjsonCall.includes(key))
            .reduce((acc, key) => {
                acc[key] = editData.data[key];
                return acc;
            }, {});
        const parpasData = { id: editData.id, data: coreectJson };
        const mycopelData = {
            table: action.edit.tab,
            data: parpasData
        };

         alert(JSON.stringify(mycopelData))
        editApi(mycopelData)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === "success") {
                    toast.success("Item edited successfully!");
                    window.location.reload();
                } else {
                    toast.error(res);
                }
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while editing the item.");
            });
    }

    const disabledKeys = ["id", "table", "created_at", "updated_at"];

    return (
        <>


            {
                showpopup && (

                    <div className="flex medel w300 center fixed top left fullPage index darkSide">
                        <div className="popup">
                            <div className="flex medel beet">
                                <div></div>
                                <div onClick={() => setShowPopup(false)} className="iconBtn delete">
                                    <RiCloseLargeLine />
                                </div>
                            </div>
                            <div>
                                {
                                    Object.keys(editData.data).map((key) => (
                                        <div key={key} className="flex column gap10">
                                            <label>{key}</label>
                                            <input className="input" onChange={(e) => setEditData({ ...editData, data: { ...editData.data, [key]: e.target.value } })} disabled={disabledKeys.includes(key)} value={editData.data[key]} type="text" style={{ cursor: disabledKeys.includes(key) ? 'not-allowed' : 'default' }} />
                                        </div>
                                    ))
                                }
                                <div className="flex right gap10">
                                    <button onClick={handelEditCall} className="btn">Save</button>
                                </div>
                            </div>
                        </div>
                    </div>


                )
            }


            <div class="table-container">
                <table className="table animate__animated animate__fadeIn">

                    <thead>
                        <tr>
                            {
                                headers.map((key) => (
                                    <th key={key}>{key}</th>
                                ))
                            }
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            maxdata.map((item, index) => (
                                <tr key={index}>
                                    {
                                        headers.map((key) => (
                                            <td key={key}>{item[key]}</td>
                                        ))
                                    }

                                    <td className="flex center medel">
                                        {
                                            action.delete ? (
                                                <button onClick={() => handelDelate({ tab: action.delete.tab, id: item.id })} className="iconBtn delete">
                                                    <MdDeleteOutline />
                                                </button>
                                            ) : (
                                                "..."
                                            )
                                        }
                                        {
                                            action.edit ? (
                                                <button onClick={() => handelEdit({ table: action.edit.tab, data: item })} className="iconBtn">
                                                    <CiEdit />
                                                </button>
                                            ) : null
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </>
    )
}