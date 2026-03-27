import React from "react";

export default function Table({ maxdata }) {

    if (!maxdata || maxdata.length === 0) {
        return <p>No data found</p>;
    }

    const headers = Object.keys(maxdata[0]);

    return (
        <table className="table">

            <thead>
                <tr>
                    {
                        headers.map((key) => (
                            <th key={key}>{key}</th>
                        ))
                    }
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
                        </tr>
                    ))
                }
            </tbody>

        </table>
    )
}