import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { dropApi } from "../../api/dropApi";
import { toast } from "react-toastify";


export default function Table({ maxdata, action }) {

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
        alert(JSON.stringify(poiter));
    }

    return (
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
                                            <button onClick={() => handelEdit({tab: action.edit.tab, name: item.subcategory, id: item.id})} className="iconBtn">
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
    )
}