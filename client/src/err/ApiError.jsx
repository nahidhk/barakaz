import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { useGetApi } from "../api/useGetApi";


export default function ApiError() {
    const { jsonData: myData } = useGetApi("catagory");

    if (myData === null) {
        return null;
    }

    if (myData && myData.length > 0) return null;

    return (
        <div className="flex center medel fixed top fullPage index darkSide">
            <div className="errorCard flex center column gap20 medel">
                <FiAlertTriangle className="errorIcon" />
                <h2 className="error">Server Error</h2>
                <p>Sorry, something went wrong while fetching data from the server.  Please reload the page and try again later.</p>
                <button className="errorBtn" onClick={() => window.location.reload()} >
                    Reload Page
                </button>
            </div>
        </div>
    );
}