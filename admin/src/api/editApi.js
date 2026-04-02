
import api from './api.json';


export async function editApi(editData) {
    try {
        const response = await fetch(api.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "edit",
                table: editData.table,
                key: api.apikey,
                data: editData.data
            })
        });

        // response return korte hobe
        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
} 