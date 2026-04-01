import api from "./api.json";

export default async function postApi(postData) {
    try {
        const response = await fetch(api.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "post",
                table: postData.table,
                key: api.apikey,
                data: postData.data
            })
        });

        // response return korte hobe
        return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}