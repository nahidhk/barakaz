import React from "react";
import { TbCategoryPlus } from "react-icons/tb";
export default function Category() {
    return (
        <>
            <div className="flex center column gap20">
                <div className="bar">
                    <button>
                        <TbCategoryPlus />  Category
                    </button>
                    <button>
                        <TbCategoryPlus />  Sub Category
                    </button>
                </div>
                <div className="w100 flex center border">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Action</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>30</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                            <tr>
                                <td>John Doe</td>
                                <td>30</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                            <tr>
                                <td>John Doe</td>
                                <td>30</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>


                            <tr>
                                <td>John Doe</td>
                                <td>30</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}