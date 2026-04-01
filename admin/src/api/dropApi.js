

import api from "./api";



export async function dropApi(dropData) {
    if (window.confirm("Are you sure you want to delete this item?")) {
        try {
            const response = await fetch(api.baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "drop",
                    table: dropData.table,
                    key: api.apikey,
                    data: dropData.data
                })
            });

            // response return korte hobe
            return response;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    }
}